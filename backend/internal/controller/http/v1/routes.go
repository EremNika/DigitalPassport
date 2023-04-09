package v1

import (
	"context"

	"hahaton/internal/domain/auth/middleware"
	"hahaton/internal/domain/user"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	UserUC user.UseCase
}

const prefix = "/api"

func NewRouter(router *gin.Engine, ctx context.Context, middleware middleware.Init, controller Controller) {
	public := router.Group(prefix + "/v1")
	{
		users := public.Group("/users")
		{
			h := newUserHandler(ctx, controller.UserUC)
			users.POST("/sign-up", h.signUp)
			users.POST("/sign-in", h.signIn)

			users.Use(middleware.Auth())
			users.GET("/info", h.userInfo)
			users.PUT("/profile", h.updateProfile)
		}
	}
}
