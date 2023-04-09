package user

import (
	"hahaton/internal/domain/user/dto"
	"hahaton/internal/domain/user/model"
)

type UseCase interface {
	Registration(dto dto.UserRegistrationDTO) (*model.UserAndTokens, error)
	FindById(id string) (*model.User, error)
	FindByLogin(login string) *model.User
	Authorization(userDto dto.UserAuthorizationDTO) (*model.UserAndTokens, error)
}
