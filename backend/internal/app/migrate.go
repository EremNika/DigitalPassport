package app

import (
	"context"

	"hahaton/config"
	"hahaton/internal/domain/user/model"
	"hahaton/pkg/client/gorm_postgesql"
	"hahaton/pkg/logging"
)

func init() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ctx = logging.ContextWithLogger(ctx, logging.NewLogger())

	cfg := config.GetConfig(ctx)

	pgConfig := gorm_postgesql.NewConfig(
		cfg.PostgreSQL.Username, cfg.PostgreSQL.Password, cfg.PostgreSQL.Host,
		cfg.PostgreSQL.Port, cfg.PostgreSQL.Database,
	)
	pgClient := gorm_postgesql.NewClient(pgConfig)

	logging.Info(ctx, "start migrations")
	err := pgClient.AutoMigrate(&model.User{})

	if err != nil {
		logging.Error(ctx, err)
	}

	logging.Info(ctx, "migration was successful")
}
