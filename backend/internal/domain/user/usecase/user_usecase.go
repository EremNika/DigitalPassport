package usecase

import (
	"context"
	"errors"
	"fmt"

	"hahaton/config"
	"hahaton/internal/domain/user"
	"hahaton/internal/domain/user/dto"
	"hahaton/internal/domain/user/model"

	"gorm.io/gorm"
)

type UserUC struct {
	db  *gorm.DB
	ctx context.Context
	cfg *config.Config
}

func NewUserUseCase(ctx context.Context, cfg *config.Config, db *gorm.DB) user.UseCase {
	return &UserUC{
		db:  db,
		ctx: ctx,
		cfg: cfg,
	}
}

func (u *UserUC) Registration(userDto dto.UserRegistrationDTO) (*model.UserAndTokens, error) {
	existsUser := u.FindByLogin(userDto.Login)
	if existsUser != nil {
		return nil, errors.New(fmt.Sprintf("user with mail %s already existsUser", existsUser.Email))
	}

	hashedPassword, err := hashPassword(userDto.Password)
	if err != nil {
		return nil, err
	}

	newUser := model.User{
		Login:    userDto.Login,
		Name:     userDto.Name,
		Password: hashedPassword,
	}
	result := u.db.Create(&newUser)
	if result.Error != nil {
		return nil, result.Error
	}

	currentUser := model.UserAndTokens{
		User: newUser,
	}

	err = generateTokens(&currentUser, u.cfg)
	if err != nil {
		return nil, err
	}

	return &currentUser, nil
}

func (u *UserUC) FindById(id string) (*model.User, error) {
	var currentUser model.User
	result := u.db.Where("id = ?", id).First(&currentUser)
	if result.RowsAffected == 0 {
		return nil, errors.New("user not found")
	}

	return &currentUser, nil
}

func (u *UserUC) FindByLogin(login string) *model.User {
	var currentUser model.User
	result := u.db.Where("login = ?", login).First(&currentUser)
	if result.RowsAffected == 0 {
		return nil
	}

	return &currentUser
}

func (u *UserUC) Authorization(userDto dto.UserAuthorizationDTO) (*model.UserAndTokens, error) {
	existsUser := u.FindByLogin(userDto.Login)
	if existsUser == nil {
		return nil, errors.New(fmt.Sprintf("user with mail %s not found", userDto.Login))
	}

	currentUser := &model.UserAndTokens{
		User: *existsUser,
	}

	isPasswordHash := checkPasswordHash(existsUser.Password, userDto.Password)
	if !isPasswordHash {
		return nil, errors.New("incorrect password")
	}

	err := generateTokens(currentUser, u.cfg)
	if err != nil {
		return nil, err
	}

	return currentUser, nil
}
