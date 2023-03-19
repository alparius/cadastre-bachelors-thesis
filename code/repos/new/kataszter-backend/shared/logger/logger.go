package logger

import (
	"fmt"
	"path"
	"runtime"

	"github.com/mattn/go-colorable"
	"github.com/sirupsen/logrus"
)

// Setup sets up the global logger configuration for the logrus package.
func Setup() {
	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:     true,
		TimestampFormat: "2006 Jan _2 15:04:05",
		FullTimestamp:   true,
		CallerPrettyfier: func(f *runtime.Frame) (string, string) {
			filename := path.Base(f.File)
			return fmt.Sprintf("%s:%d", filename, f.Line), fmt.Sprintf("%s()", f.Function)
		},
	})
	logrus.SetReportCaller(true)
	logrus.SetOutput(colorable.NewColorableStdout())
	logrus.SetLevel(logrus.TraceLevel)
}
