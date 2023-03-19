package uploader

import (
	"os"
	"path/filepath"
)

var FileExtensions = map[string]bool{
	".pdf":  true,
	".docx": true,
	".PDF":  true,
	".DOCX": true,
}

var PictureExtensions = map[string]bool{
	".png":  true,
	".jpg":  true,
	".jpeg": true,
	".PNG":  true,
	".JPG":  true,
	".JPEG": true,
}

func Rollback(filenames []string) {	
	for _, filename := range filenames {
		filePath, _ := filepath.Abs("./uploaded/" + filename)
		_ = os.Remove(filePath)
	}
}

func Setup() {
	if _, err := os.Stat("uploaded"); os.IsNotExist(err) {
		err = os.Mkdir("uploaded", 0755)
		if err != nil {
				panic(err)
		}
	}
}
