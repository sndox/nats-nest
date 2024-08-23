package logger

import (
	"os"

	"github.com/charmbracelet/log"
)

type Logger struct {
	logger *log.Logger
}

func NewLogger() *Logger {
	logger := log.New(os.Stdout)

	return &Logger{logger: logger}
}

func (l *Logger) Noticef(format string, v ...interface{}) {
	l.logger.Infof(format, v...)
}

func (l *Logger) Warnf(format string, v ...interface{}) {
	l.logger.Warnf(format, v...)
}

func (l *Logger) Fatalf(format string, v ...interface{}) {
	l.logger.Fatalf(format, v...)
}

func (l *Logger) Errorf(format string, v ...interface{}) {
	l.logger.Errorf(format, v...)
}

func (l *Logger) Debugf(format string, v ...interface{}) {
	l.logger.Debugf(format, v...)
}

func (l *Logger) Tracef(format string, v ...interface{}) {
	l.logger.Debugf(format, v...) // Charmbracelet log doesn't have a Tracef, use Debugf
}
