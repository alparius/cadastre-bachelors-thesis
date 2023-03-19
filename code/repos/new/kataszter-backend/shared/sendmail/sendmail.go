package sendmail

import (
	"bytes"
	"crypto/tls"
	"html/template"
	"io/ioutil"
	"kataszter-backend/model"
	"kataszter-backend/router/middleware/auth"
	"kataszter-backend/shared/config"
	"strconv"

	"github.com/buger/jsonparser"
	"github.com/go-gomail/gomail"
	"github.com/sirupsen/logrus"
)

// SmtpDown is a global boolean recording if the smtp works or not
var SmtpDown bool

func init() {
	SmtpDown = false
}

func setSmtpDown(err error) {
	if err != nil {
		SmtpDown = true
	} else {
		SmtpDown = false
	}
}

type templateDataRegister struct {
	User    model.User
	Message string
}

type templateDataForgotPassword struct {
	User    model.User
	TokenId string
}

type mailData struct {
	to      []string
	subject string
	body    string
}

var roleTranslations = map[string]string{
	"admin":  "adminisztrátor",
	"editor": "szerkesztő",
	"reader": "olvasó",
	"guest":  "vendég",
}

// Constructs, authenticates and send out the mail
func ConstructAuthenticateSend(recipients []string, subject string, tmpltFile string, tmpltData interface{}) error {
	// constructing the mail body: parsing the template data into the template html
	mail := mailData{to: recipients, subject: subject}
	err := mail.parseTemplate(tmpltFile, tmpltData)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("parseTemplate() error")
		return err
	}

	// sending out the mail
	err = mail.send()
	if err != nil {
		logrus.WithField("error", err.Error()).Error("send() error")
	}
	return err
}

// SendRegisterMail sends an appropiate email depending on the user's role it is about.
func SendRegisterMail(recipients []string, message string, aboutUser model.User) error {

	// the subject of the message and the used template html file
	var subject string
	var tmpltFile string
	if aboutUser.Role == auth.PENDING {
		subject = getText("subjectRequest")
		tmpltFile = "static/sendmail/register-template.html"
	} else if aboutUser.Role == auth.REFUSED {
		subject = getText("subjectDecision")
		tmpltFile = "static/sendmail/refuse-template.html"
	} else {
		subject = getText("subjectDecision")
		tmpltFile = "static/sendmail/accept-template.html"
	}

	// the data used in the html template file
	aboutUser.Role = roleTranslations[aboutUser.Role]
	tmpltData := templateDataRegister{
		Message: message,
		User:    aboutUser,
	}

	err := ConstructAuthenticateSend(recipients, subject, tmpltFile, tmpltData)
	setSmtpDown(err)
	return err
}

// SendForgotPasswordMail sends an appropiate email depending on the user's role it is about.
func SendForgotPasswordMail(recipients []string, aboutUser model.User, tokenId string) error {

	// the subject of the message and the used template html file
	var subject string
	var tmpltFile string
	subject = getText("forgotPasswordRequest")
	tmpltFile = "static/sendmail/forgotPassword-template.html"

	// the data used in the html template file
	tmpltData := templateDataForgotPassword{
		User:    aboutUser,
		TokenId: tokenId,
	}

	err := ConstructAuthenticateSend(recipients, subject, tmpltFile, tmpltData)
	setSmtpDown(err)
	return err
}

// getText returns a text with the given key
func getText(key string) string {
	dataBytes, err := ioutil.ReadFile("static/sendmail/strings_hu.json")
	if err != nil {
		logrus.WithField("error", err.Error()).Error("readfile error")
		return ""
	}
	value, err := jsonparser.GetString(dataBytes, key)
	if err != nil {
		logrus.WithField("error", err.Error()).Error("json parsing error - key not found")
		return ""
	}
	return value
}

// parseTemplate parses the template data into the template html
func (mail *mailData) parseTemplate(templateFileName string, templateData interface{}) error {
	tmplt, err := template.ParseFiles(templateFileName)
	if err != nil {
		return err
	}

	buf := new(bytes.Buffer)
	err = tmplt.Execute(buf, templateData)
	if err != nil {
		return err
	}

	mail.body = buf.String()
	return nil
}

// send constructs the email as a whole and sends it out.
func (mail *mailData) send() error {
	smtpPortInt, err := strconv.Atoi(config.SmtpPort)
	if err != nil {
		return err
	}

	d := gomail.NewDialer(config.SmtpHost, smtpPortInt, config.EmailAddress, config.EmailPassword)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	for _, recipientAddress := range mail.to {
		m := gomail.NewMessage()
		m.SetHeader("From", config.EmailAddress)
		m.SetHeader("To", recipientAddress)
		m.SetHeader("Subject", mail.subject)
		m.SetBody("text/html", mail.body)

		err = d.DialAndSend(m)
		if err != nil {
			return err
		}
	}

	return nil
}
