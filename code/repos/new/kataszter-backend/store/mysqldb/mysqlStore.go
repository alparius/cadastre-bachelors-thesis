package mysqldb

import (
	"database/sql"
	"fmt"
	"kataszter-backend/model"
	"regexp"
	"strconv"
	"strings"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MysqlStore struct {
	db *sql.DB
}

var throwAwayID *int

// Init creates and returns a MySQL database connection.
func Init(sql_provider string, sql_user string, sql_password string, sql_ip string, sql_database string) *MysqlStore {
	connectionString := fmt.Sprintf("%s:%s@tcp(%s)/%s", sql_user, sql_password, sql_ip, sql_database)
	db, err := sql.Open(sql_provider, connectionString)
	if err != nil {
		logrus.Error(err)
	}

	return &MysqlStore{db}
}

// GetPriestsCount returns the rowcount of the Priests table.
func (mysql *MysqlStore) GetPriestsCount() int {
	rows, err := mysql.db.Query("SELECT COUNT(*) FROM Priests")
	if err != nil {
		logrus.Error(err)
	}
	defer rows.Close()

	var count int
	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			logrus.Error(err)
		}
	}
	return count
}

// GetAllPriests reads and returns the whole Priests table.
func (mysql *MysqlStore) GetAllPriests() *[]model.Priest {
	results, err := mysql.db.Query("SELECT * FROM Priests")
	if err != nil {
		logrus.Error(err)
	}

	priests := make([]model.Priest, 0)
	var birthDateString, deathDateString, retirementDateString sql.NullString
	var priest model.Priest
	for results.Next() {
		err = results.Scan(&throwAwayID, &priest.Name, &birthDateString, &deathDateString,
			&priest.BirthCountry, &priest.BirthCounty, &priest.BirthTown, &priest.Diocese,
			&priest.IsMarried, &priest.IsMarried, &priest.IsWidow, &priest.IsDivorced,
			&priest.Father.Name, &priest.Mother.Name, &priest.SpeakingSkills.Well, &priest.SpeakingSkills.Medium, &priest.SpeakingSkills.Less,
			&priest.WritingSkills.Well, &priest.WritingSkills.Medium, &priest.WritingSkills.Less, &priest.Army, &retirementDateString)
		priest.BirthDate = parseDate(birthDateString)
		priest.DeathDate = parseDate(deathDateString)
		priest.RetirementDate = parseDate(retirementDateString)
		if err != nil {
			logrus.Error(err)
		}
		priests = append(priests, priest)
	}

	return &priests
}

// AddAllSpouses reads and adds the spouses to their spouse priests.
func (mysql *MysqlStore) AddAllSpouses(priests *[]model.Priest) {
	results, err := mysql.db.Query("SELECT * FROM Wifes")
	if err != nil {
		logrus.Error(err)
	}

	var spouses = make([]model.Spouse, 0)
	var birthDateString1, birthDateString2, marriageDateString1, marriageDateString2 sql.NullString
	results.Next()
	var spouse1 model.Spouse
	err = results.Scan(&throwAwayID, &spouse1.PriestSqlID, &spouse1.Name, &birthDateString1, &spouse1.Job, &marriageDateString2, &spouse1.FatherName, &spouse1.MotherName)
	spouse1.BirthDate = parseDate(birthDateString1)
	spouse1.BirthDate = parseDate(marriageDateString1)
	if err != nil {
		logrus.Error(err)
	}
	for results.Next() {
		var spouse2 model.Spouse
		err = results.Scan(&throwAwayID, &spouse2.PriestSqlID, &spouse2.Name, &birthDateString2, &spouse2.Job, &marriageDateString2, &spouse2.FatherName, &spouse2.MotherName)
		spouse2.BirthDate = parseDate(birthDateString2)
		spouse2.BirthDate = parseDate(marriageDateString2)
		if err != nil {
			logrus.Error(err)
		}
		spouses = append(spouses, spouse1)

		if spouse1.PriestSqlID != spouse2.PriestSqlID {
			(*priests)[spouse1.PriestSqlID-1].Spouses = spouses
			//reset attributes
			spouses = make([]model.Spouse, 0)
		}
		spouse1 = spouse2
	}
	spouses = append(spouses, spouse1)
	(*priests)[spouse1.PriestSqlID-1].Spouses = spouses
}

// AddAllChildren reads and adds the childen to their father priests.
func (mysql *MysqlStore) AddAllChildren(priests *[]model.Priest) {
	results, err := mysql.db.Query("SELECT * FROM Children")
	if err != nil {
		logrus.Error(err)
	}

	var children = make([]model.Child, 0)
	var birthDateString1, birthDateString2 sql.NullString
	results.Next()
	var child1 model.Child
	err = results.Scan(&throwAwayID, &child1.PriestSqlID, &child1.Name, &child1.BirthPlace, &birthDateString1)
	child1.BirthDate = parseDate(birthDateString1)
	if err != nil {
		logrus.Error(err)
	}

	for results.Next() {
		var child2 model.Child
		err = results.Scan(&throwAwayID, &child2.PriestSqlID, &child2.Name, &child2.BirthPlace, &birthDateString2)
		child2.BirthDate = parseDate(birthDateString2)
		if err != nil {
			logrus.Error(err)
		}

		children = append(children, child1)
		if child1.PriestSqlID != child2.PriestSqlID {
			(*priests)[child1.PriestSqlID-1].Children = children
			//reset attributes
			children = make([]model.Child, 0)
		}
		child1 = child2
	}
	children = append(children, child1)
	(*priests)[child1.PriestSqlID-1].Children = children

}

// AddAllQualifications reads and adds the qualifications to their owner priests.
func (mysql *MysqlStore) AddAllQualifications(priests *[]model.Priest) {
	results, err := mysql.db.Query("SELECT * FROM Qualifications")
	if err != nil {
		logrus.Error(err)
	}

	var qualifications = make([]model.Qualification, 0)
	var genesisDateString1, genesisDateString2 sql.NullString
	results.Next()
	var qualification1 model.Qualification
	err = results.Scan(&throwAwayID, &qualification1.PriestSqlID, &qualification1.DiplomaName, &genesisDateString1, &qualification1.IssuingAuthority)
	qualification1.GenesisDate = parseDate(genesisDateString1)
	if err != nil {
		logrus.Error(err)
	}

	for results.Next() {
		var qualification2 model.Qualification
		err = results.Scan(&throwAwayID, &qualification2.PriestSqlID, &qualification2.DiplomaName, &genesisDateString2, &qualification2.IssuingAuthority)
		qualification2.GenesisDate = parseDate(genesisDateString2)
		if err != nil {
			logrus.Error(err)
		}

		qualifications = append(qualifications, qualification1)
		if qualification1.PriestSqlID != qualification2.PriestSqlID {
			(*priests)[qualification1.PriestSqlID-1].Qualifications = qualifications
			//reset attributes
			qualifications = make([]model.Qualification, 0)
		}
		qualification1 = qualification2
	}
	qualifications = append(qualifications, qualification1)
	(*priests)[qualification1.PriestSqlID-1].Qualifications = qualifications
}

// AddAllAssistantPriestPlaces reads and adds all assistant placements to the serving priests.
func (mysql *MysqlStore) AddAllAssistantPriestPlaces(priests *[]model.Priest) {
	results, err := mysql.db.Query("SELECT * FROM AssistantPriestPlaces")
	if err != nil {
		logrus.Error(err)
	}

	var assistantPriestPlaces = make([]model.AssistantPriestPlace, 0)
	var startDateString1, startDateString2, endDateString1, endDateString2, placeName1, placeName2 sql.NullString
	results.Next()
	var assistantPriestPlace1 model.AssistantPriestPlace
	err = results.Scan(&throwAwayID, &assistantPriestPlace1.PriestSqlID, &placeName1, &startDateString1, &endDateString1)
	assistantPriestPlace1.Place = strings.TrimSpace(placeName1.String)
	assistantPriestPlace1.StartDate = parseDate(startDateString1)
	assistantPriestPlace1.EndDate = parseDate(endDateString1)
	if err != nil {
		logrus.Error(err)
	}
	assistantPriestPlace1.ID = primitive.NewObjectID()

	for results.Next() {
		var assistantPriestPlace2 model.AssistantPriestPlace
		err = results.Scan(&throwAwayID, &assistantPriestPlace2.PriestSqlID, &placeName2, &startDateString2, &endDateString2)
		assistantPriestPlace2.Place = strings.TrimSpace(placeName2.String)
		assistantPriestPlace2.StartDate = parseDate(startDateString2)
		assistantPriestPlace2.EndDate = parseDate(endDateString2)
		if err != nil {
			logrus.Error(err)
		}
		assistantPriestPlace2.ID = primitive.NewObjectID()

		assistantPriestPlaces = append(assistantPriestPlaces, assistantPriestPlace1)
		if assistantPriestPlace1.PriestSqlID != assistantPriestPlace2.PriestSqlID {
			(*priests)[assistantPriestPlace1.PriestSqlID-1].AssistantPriestPlaces = assistantPriestPlaces
			//reset attributes
			assistantPriestPlaces = make([]model.AssistantPriestPlace, 0)
		}
		assistantPriestPlace1 = assistantPriestPlace2
	}
	assistantPriestPlaces = append(assistantPriestPlaces, assistantPriestPlace1)
	(*priests)[assistantPriestPlace1.PriestSqlID-1].AssistantPriestPlaces = assistantPriestPlaces
}

// AddAllMainPriestPlaces reads and adds all main placements to the serving priests.
func (mysql *MysqlStore) AddAllMainPriestPlaces(priests *[]model.Priest) {
	results, err := mysql.db.Query("SELECT * FROM MainPriestPlaces")
	if err != nil {
		logrus.Error(err)
	}

	var mainPriestPlaces = make([]model.MainPriestPlace, 0)
	var startDateString1, startDateString2, endDateString1, endDateString2, genesisDateString1, genesisDateString2, placeName1, placeName2 sql.NullString
	results.Next()
	var mainPriestPlace1 model.MainPriestPlace
	err = results.Scan(&throwAwayID, &mainPriestPlace1.PriestSqlID, &placeName1, &startDateString1,
		&endDateString1, &genesisDateString1, &mainPriestPlace1.MunimentNumber,
		&mainPriestPlace1.MunimentIssuingAuthority, &mainPriestPlace1.Income, &mainPriestPlace1.NumberOfPeople)
	mainPriestPlace1.Place = strings.TrimSpace(placeName1.String)
	mainPriestPlace1.StartDate = parseDate(startDateString1)
	mainPriestPlace1.EndDate = parseDate(endDateString1)
	mainPriestPlace1.MunimentGenesisDate = parseDate(genesisDateString1)
	if err != nil {
		logrus.Error(err)
	}
	mainPriestPlace1.ID = primitive.NewObjectID()

	for results.Next() {
		var mainPriestPlace2 model.MainPriestPlace
		err = results.Scan(&throwAwayID, &mainPriestPlace2.PriestSqlID, &placeName2, &startDateString2,
			&endDateString2, &genesisDateString2, &mainPriestPlace2.MunimentNumber,
			&mainPriestPlace2.MunimentIssuingAuthority, &mainPriestPlace2.Income, &mainPriestPlace2.NumberOfPeople)
		mainPriestPlace2.Place = strings.TrimSpace(placeName2.String)
		mainPriestPlace2.StartDate = parseDate(startDateString2)
		mainPriestPlace2.EndDate = parseDate(endDateString2)
		mainPriestPlace2.MunimentGenesisDate = parseDate(genesisDateString2)
		if err != nil {
			logrus.Error(err)
		}
		mainPriestPlace2.ID = primitive.NewObjectID()

		mainPriestPlaces = append(mainPriestPlaces, mainPriestPlace1)
		if mainPriestPlace1.PriestSqlID != mainPriestPlace2.PriestSqlID {
			(*priests)[mainPriestPlace1.PriestSqlID-1].MainPriestPlaces = mainPriestPlaces
			//reset attributes
			mainPriestPlaces = make([]model.MainPriestPlace, 0)
		}
		mainPriestPlace1 = mainPriestPlace2
	}
	mainPriestPlaces = append(mainPriestPlaces, mainPriestPlace1)
	(*priests)[mainPriestPlace1.PriestSqlID-1].MainPriestPlaces = mainPriestPlaces
}

// parseDate creates a Date object from a string.
func parseDate(dateNullString sql.NullString) model.Date {
	var dateDate model.Date
	var date string

	if dateNullString.Valid {
		date = strings.Join(strings.Fields(dateNullString.String), "")
	} else {
		dateDate.Comment = ""
		return dateDate
	}

	dateDate.Comment = date

	matched, err := regexp.MatchString(`^([12]\d{3}\.([1-9]|0[1-9]|1[0-2])\.([1-9]|0[1-9]|[12]\d|3[01])[\.]?)$`, date)
	if err == nil && matched {
		res := strings.Split(date, ".")
		year, err := strconv.Atoi(res[0])
		if err == nil {
			dateDate.Year = year
		}
		month, err := strconv.Atoi(res[1])
		if err == nil {
			dateDate.Month = month
		}
		day, err := strconv.Atoi(res[2])
		if err == nil {
			dateDate.Day = day
		}
		dateDate.Comment = ""
	} else {
		matched, err = regexp.MatchString(`^([12]\d{3}\.([1-9]|0[1-9]|1[0-2])[\.]?)`, date)
		if err == nil && matched {
			res := strings.Split(date, ".")
			year, err := strconv.Atoi(res[0])
			if err == nil {
				dateDate.Year = year
			}
			month, err := strconv.Atoi(res[1][0:2])
			if err == nil {
				dateDate.Month = month
			}
		} else {
			matched, err = regexp.MatchString(`^([12]\d{3})[\.]?`, date)
			if err == nil && matched {
				year, err := strconv.Atoi(date[0:4])
				if err == nil {
					dateDate.Year = year
				}
			}
		}
	}

	return dateDate
}
