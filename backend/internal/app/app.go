package app

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"os"

	"hahaton/config"
	v1 "hahaton/internal/controller/http/v1"
	"hahaton/internal/domain/auth/middleware"
	"hahaton/internal/domain/user/usecase"
	"hahaton/pkg/client/gorm_postgesql"
	"hahaton/pkg/logging"

	"github.com/gin-gonic/gin"
	"github.com/rs/cors"
	csrf "github.com/utrack/gin-csrf"
)

type App struct {
	cfg *config.Config

	router     *gin.Engine
	httpServer *http.Server
}

func NewApp(ctx context.Context, cfg *config.Config) (App, error) {
	if !cfg.App.IsDebug {
		if err := os.Setenv(gin.EnvGinMode, gin.ReleaseMode); err != nil {
			logging.Error(ctx, err)
		}
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// Database postgresql
	pgConfig := gorm_postgesql.NewConfig(
		cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Port, cfg.PostgreSQL.Database,
	)
	pgClient := gorm_postgesql.NewClient(pgConfig)

	// Controller
	logging.Info(ctx, "useCases initializing")
	userUC := usecase.NewUserUseCase(ctx, cfg, pgClient)

	// Middlewares
	logging.Info(ctx, "middlewares initializing")
	authMiddleware := middleware.NewAuth(ctx, cfg.App.Jwt.AccessTokenPrivateKey, userUC)

	// Controllers
	logging.Info(ctx, "controllers initializing")
	v1.NewRouter(router, ctx, authMiddleware, v1.Controller{
		UserUC: userUC,
	})

	return App{
		cfg:    cfg,
		router: router,
	}, nil
}

func (a *App) Run(ctx context.Context) {
	a.startHTTP(ctx)
}

func (a *App) startHTTP(ctx context.Context) {
	logger := logging.WithFields(ctx, map[string]interface{}{
		"IP":   a.cfg.HTTP.IP,
		"Port": a.cfg.HTTP.Port,
	})
	logger.Info("HTTP Server initializing")

	listener, err := net.Listen("tcp", fmt.Sprintf("%s:%d", a.cfg.HTTP.IP, a.cfg.HTTP.Port))
	if err != nil {
		logger.WithError(err).Fatal("failed to create listener")
	}

	logger.WithFields(map[string]interface{}{
		"AllowedMethods":     a.cfg.HTTP.CORS.AllowedMethods,
		"AllowedOrigins":     a.cfg.HTTP.CORS.AllowedOrigins,
		"AllowCredentials":   a.cfg.HTTP.CORS.AllowCredentials,
		"AllowedHeaders":     a.cfg.HTTP.CORS.AllowedHeaders,
		"OptionsPassthrough": a.cfg.HTTP.CORS.OptionsPassthrough,
		"ExposedHeaders":     a.cfg.HTTP.CORS.ExposedHeaders,
		"Debug":              a.cfg.HTTP.CORS.Debug,
	})
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://127.0.0.1:3000"},
		AllowCredentials: true,
		Debug:            true,
		AllowedHeaders:   []string{"Authorization"},
	})

	a.router.Use(csrf.Middleware(csrf.Options{
		Secret: "secret123",
		ErrorFunc: func(c *gin.Context) {
			c.String(400, "CSRF token mismatch")
			c.Abort()
		},
	}))

	handler := c.Handler(a.router)

	a.httpServer = &http.Server{
		Handler:      handler,
		WriteTimeout: a.cfg.HTTP.WriteTimeout,
		ReadTimeout:  a.cfg.HTTP.ReadTimeout,
	}

	if err = a.httpServer.Serve(listener); err != nil {
		switch {
		case errors.Is(err, http.ErrServerClosed):
			logger.Warning("server shutdown")
		default:
			logger.Fatal(err)
		}
	}
	err = a.httpServer.Shutdown(context.Background())
	if err != nil {
		logger.Fatal(err)
	}
}
