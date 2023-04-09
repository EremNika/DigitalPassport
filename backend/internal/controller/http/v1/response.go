package v1

import (
	"hahaton/pkg/logging"

	"github.com/gin-gonic/gin"
)

type errorResponse struct {
	Message string `json:"message"`
}

func newErrorResponse(c *gin.Context, statusCode int, message string) {
	logger := logging.GetLogger()
	logger.Error(message)
	c.AbortWithStatusJSON(statusCode, errorResponse{message})
}
