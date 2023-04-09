package dto

import (
	validation "github.com/go-ozzo/ozzo-validation"
)

type UserRegistrationDTO struct {
	Login      string `json:"login"`
	Password   string `json:"password"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Surname    string `json:"surname"`
	Name       string `json:"name"`
	Patronymic string `json:"patronymic"`
}

func (u UserRegistrationDTO) Validate() error {
	return validation.ValidateStruct(&u,
		validation.Field(&u.Login,
			validation.Required,
			validation.Length(5, 40),
		),
		validation.Field(&u.Name,
			validation.Required,
			validation.Length(2, 20),
		),
		validation.Field(&u.Password,
			validation.Required,
			validation.Length(8, 18),
		),
	)
}
