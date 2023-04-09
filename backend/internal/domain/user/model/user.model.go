package model

import (
	"time"
)

type User struct {
	ID         string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Login      string    `json:"login" gorm:"not null;unique"`
	Password   string    `json:"-" gorm:"not null"`
	Email      string    `json:"email"`
	Phone      string    `json:"phone"`
	Surname    string    `json:"surname"`
	Name       string    `json:"name"`
	Patronymic string    `json:"patronymic"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

type UserAndTokens struct {
	User
	Tokens struct {
		Access  string `json:"access"`
		Refresh string `json:"refresh"`
	} `json:"tokens"`
}
