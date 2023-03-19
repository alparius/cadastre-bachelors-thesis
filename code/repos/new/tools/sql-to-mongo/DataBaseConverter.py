if __name__ == '__main__':
    # Reading an excel file using Python
    import xlrd
    import datetime
    import re

    # Give the location of the file
    loc = 'exportedFromAccess.xlsx'

    MANUAL_DATA_FILL = False
    SHOW_FALSE = False

    # To open Workbook
    wb = xlrd.open_workbook(loc)
    sheet = wb.sheet_by_index(0)

    # For row 0 and column 0
    i = 1
    while i < sheet.nrows:
        # Diocese
        diocese = sheet.cell_value(i, 1)

        # Priest
        priestName = sheet.cell_value(i, 2)
        bornDate = sheet.cell_value(i, 4)
        bornCountry = sheet.cell_value(i, 5)
        bornCounty = sheet.cell_value(i, 6)
        bornTown = sheet.cell_value(i, 7)
        unMarried = sheet.cell_value(i, 10)
        married = sheet.cell_value(i, 11)
        widow = sheet.cell_value(i, 12)
        divorced = sheet.cell_value(i, 13)

        # Wifes
        helperWifesName = sheet.cell_value(i, 14)
        wifesName = helperWifesName.split(', ')
        helperWifesBornDate = sheet.cell_value(i, 15)
        helperWifesBornDate = helperWifesBornDate.replace(" ", "")
        wifesBornDate = helperWifesBornDate.split(',')
        helperWifesJob = sheet.cell_value(i, 16)
        wifesJob = helperWifesJob.split(',')
        helperMarriageDate = sheet.cell_value(i, 17)
        marriageDate = helperMarriageDate.split(',')

        # Children
        helperChildrenNames = sheet.cell_value(i, 20)
        childrenNames = helperChildrenNames.splitlines()
        helperChildrenBornPlace = sheet.cell_value(i, 21)
        childrenBornPlace = helperChildrenBornPlace.splitlines()
        helperChildrenBornDate = sheet.cell_value(i, 22)
        childrenBornDate = helperChildrenBornDate.splitlines()

        # Fathers/Mothers
        priestFather = sheet.cell_value(i, 25)
        priestMother = sheet.cell_value(i, 26)
        wifesFather = (sheet.cell_value(i, 27))
        wifesMother = (sheet.cell_value(i, 28))

        # Languages
        speakWell = sheet.cell_value(i, 30)
        speakMedium = sheet.cell_value(i, 31)
        speakLess = sheet.cell_value(i, 32)
        writeWell = sheet.cell_value(i, 33)
        writeMedium = sheet.cell_value(i, 34)
        writeLess = sheet.cell_value(i, 35)

        # Qualifications
        priestDiplomaName = (sheet.cell_value(i, 37)).splitlines()
        priestDiplomaGenesisDate = (sheet.cell_value(i, 39)).splitlines()
        issuingAuthority = (sheet.cell_value(i, 40)).splitlines()
        consecration = (sheet.cell_value(i, 41))
        militaryObligation = (sheet.cell_value(i, 43))

        assistantPriestPlaces = (sheet.cell_value(i, 46)).splitlines()
        assistantPriestStartDate = (sheet.cell_value(i, 47)).splitlines()
        assistantPriestEndDate = (sheet.cell_value(i, 48)).splitlines()

        mainPriestPlaces = (sheet.cell_value(i, 51)).splitlines()
        mainPriestStartDate = (sheet.cell_value(i, 52)).splitlines()
        mainPriestEndDate = (sheet.cell_value(i, 53)).splitlines()
        munimentGenesisDate = (sheet.cell_value(i, 55)).splitlines()
        munimentNumber = (sheet.cell_value(i, 56)).splitlines()
        munimentIssuingAuthority = (sheet.cell_value(i, 57)).splitlines()
        income = (sheet.cell_value(i, 58)).splitlines()
        numberOfPeople = (sheet.cell_value(i, 59)).splitlines()

        # ChurchOffices
        churchOfficesName = (sheet.cell_value(i, 66)).splitlines()
        churchOfficesStartDate = (sheet.cell_value(i, 67)).splitlines()
        churchOfficesEndDate = (sheet.cell_value(i, 68)).splitlines()
        churchOfficesComment = (sheet.cell_value(i, 69)).splitlines()

        # OtherOffices
        otherOfficesName = (sheet.cell_value(i, 71)).splitlines()
        otherOfficesStartDate = (sheet.cell_value(i, 72)).splitlines()
        otherOfficesEndDate = (sheet.cell_value(i, 73)).splitlines()
        otherOfficesComment = (sheet.cell_value(i, 74)).splitlines()

        # LiteraryWorks
        literaryWorks = (sheet.cell_value(i, 76)).splitlines()
        literaryWorksComment = (sheet.cell_value(i, 77)).splitlines()

        # DisciplinaryMatters
        disciplinaryMattersIssuingAuthority = (
            sheet.cell_value(i, 79)).splitlines()
        disciplinaryMattersName = (sheet.cell_value(i, 80)).splitlines()

        # Suspensions
        suspensionsStartDate = (sheet.cell_value(i, 82)).splitlines()
        suspensionsEndDate = (sheet.cell_value(i, 83)).splitlines()
        suspensionsPunishment = (sheet.cell_value(i, 83)).splitlines()
        suspensionsDateAndNumber = (sheet.cell_value(i, 85)).splitlines()
        suspensionsComment = (sheet.cell_value(i, 86)).splitlines()

        resigned = (sheet.cell_value(i, 87))
        changedCareer = (sheet.cell_value(i, 88))
        fired = (sheet.cell_value(i, 89))

        retirementDate = (sheet.cell_value(i, 90))
        deathDate = (sheet.cell_value(i, 91))
        note = (sheet.cell_value(i, 92))

        # Date pre sync
        if len(priestDiplomaGenesisDate) > 0:
            for iterator in range(len(priestDiplomaGenesisDate)):
                dateCheck = priestDiplomaGenesisDate[iterator].replace(".", "")
                dateCheck = dateCheck.replace(" ", "")
                if len(dateCheck) == 8:
                    dateCheck = (datetime.datetime.strptime(
                        dateCheck, '%Y%m%d').strftime('%Y.%m.%d'))
                    priestDiplomaGenesisDate[iterator] = dateCheck
                else:
                    if MANUAL_DATA_FILL == True and len(priestDiplomaGenesisDate[iterator]) > 0:
                        print("Human! Please help! What's this: ",
                              priestDiplomaGenesisDate[iterator])
                        text = input("input:")
                        priestDiplomaGenesisDate[iterator] = text
                    else:
                        if SHOW_FALSE == True:
                            print(False, priestDiplomaGenesisDate[iterator])

        if len(resigned) > 0:
            resigned = (''.join(filter(str.isdigit, resigned)))
            if len(resigned) >= 4:
                resigned = resigned[0:4]
        if len(fired) > 0:
            fired = (''.join(filter(str.isdigit, fired)))
            if len(fired) >= 4:
                fired = fired[0:4]
        # Date pre sync end

        import mysql.connector
        cnx = mysql.connector.connect(user='converter',
                                      password='password',
                                      host='127.0.0.1',
                                      database='priestsdatabase')
        mycursor = cnx.cursor()
        sql = "INSERT INTO Priests (" \
            "Name," \
            "BornDate," \
            "DeathDate," \
            "BornCountry," \
            "BornCounty," \
            "BornTown," \
            "Diocese," \
            "UnMarried," \
            "Married," \
            "Widow," \
            "Divorced," \
            "Father," \
            "Mother," \
            "SpeakWell," \
            "SpeakMedium," \
            "SpeakLess," \
            "WriteWell," \
            "WriteMedium," \
            "WriteLess," \
            "Army," \
            "RetirementDate," \
            "Consecration," \
            "Resigned," \
            "Fired," \
            "ChangedCareer," \
            "Note" \
            ") " \
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"            

        val = (priestName, bornDate, deathDate, bornCountry, bornCounty, bornTown, diocese, unMarried, married, widow, divorced,
               priestFather, priestMother, speakWell, speakMedium, speakLess, writeWell, writeMedium, writeLess, militaryObligation,
               retirementDate, consecration, resigned, fired, changedCareer, note
               )
        mycursor.execute(sql, val)
        mycursor.execute('COMMIT')

        # PriestID for one-to-many
        sql = "SELECT * FROM Priests WHERE Name = %s AND BornDate = %s"
        adr = (priestName, bornDate,)
        mycursor.execute(sql, adr)
        myresult = mycursor.fetchall()
        row = myresult[0]
        priestID = row[0]

        # Wifes
        howManyWife = len(wifesName)
        for x in range(howManyWife):
            wifesBornDateHelper = [""] * 10
            wifesJobHelper = [""] * 10
            marriageDateHelper = [""] * 10
            for iterator in range(len(wifesBornDate)):
                wifesBornDateHelper[iterator] = wifesBornDate[iterator]
            for iterator in range(len(wifesJob)):
                wifesJobHelper[iterator] = wifesJob[iterator]
            for iterator in range(len(marriageDate)):
                marriageDateHelper[iterator] = marriageDate[iterator]
            sql = "INSERT INTO Wifes (" \
                  "PriestID," \
                  "Name," \
                  "BornDate," \
                  "Job," \
                  "MarriageDate," \
                  "Father," \
                  "Mother" \
                  ") " \
                  "VALUES (%s, %s, %s, %s, %s, %s, %s)"
            val = (priestID, wifesName[x], wifesBornDateHelper[x],
                   wifesJobHelper[x], marriageDateHelper[x], wifesFather, wifesMother)
            if wifesName[x] != "":
                mycursor.execute(sql, val)
                mycursor.execute('COMMIT')

        # Children
        howManyChildren = len(childrenNames)
        for x in range(howManyChildren):
            childrenBornPlaceHelper = [""] * 15
            childrenBornDateHelper = [""] * 15
            for iterator in range(len(childrenBornPlace)):
                childrenBornPlaceHelper[iterator] = childrenBornPlace[iterator]
            for iterator in range(len(childrenBornDate)):
                childrenBornDateHelper[iterator] = childrenBornDate[iterator]
            sql = "INSERT INTO Children (" \
                  "PriestID," \
                  "Name," \
                  "BornPlace," \
                  "BornDate" \
                  ") " \
                  "VALUES (%s, %s, %s, %s)"
            val = (
                priestID, childrenNames[x], childrenBornPlaceHelper[x], childrenBornDateHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # Assistant Priest Places
        howManyAssistantPriestPlaces = len(assistantPriestPlaces)
        for x in range(howManyAssistantPriestPlaces):
            assistantPriestStartDateHelper = [""] * 15
            assistantPriestEndDateHelper = [""] * 15
            for iterator in range(len(assistantPriestStartDate)):
                assistantPriestStartDateHelper[iterator] = assistantPriestStartDate[iterator]
            for iterator in range(len(assistantPriestEndDate)):
                assistantPriestEndDateHelper[iterator] = assistantPriestEndDate[iterator]
            sql = "INSERT INTO AssistantPriestPlaces (" \
                  "PriestID," \
                  "Place," \
                  "StartDate," \
                  "EndDate" \
                  ") " \
                  "VALUES (%s, %s, %s, %s)"
            val = (
                priestID, assistantPriestPlaces[x], assistantPriestStartDateHelper[x], assistantPriestEndDateHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # Main Priest Places
        howManyMainPriestPlaces = len(mainPriestPlaces)
        for x in range(howManyMainPriestPlaces):
            mainPriestStartDateHelper = [""] * 15
            mainPriestEndDateHelper = [""] * 15
            munimentGenesisDateHelper = [""] * 15
            munimentNumberHelper = [""] * 15
            munimentIssuingAuthorityHelper = [""] * 15
            incomeHelper = [""] * 15
            numberOfPeopleHelper = [""] * 15
            for iterator in range(len(mainPriestStartDate)):
                mainPriestStartDateHelper[iterator] = mainPriestStartDate[iterator]
            for iterator in range(len(mainPriestEndDate)):
                mainPriestEndDateHelper[iterator] = mainPriestEndDate[iterator]
            for iterator in range(len(munimentGenesisDate)):
                munimentGenesisDateHelper[iterator] = munimentGenesisDate[iterator]
            for iterator in range(len(munimentNumber)):
                munimentNumberHelper[iterator] = munimentNumber[iterator]
            for iterator in range(len(munimentIssuingAuthority)):
                munimentIssuingAuthorityHelper[iterator] = munimentIssuingAuthority[iterator]
            for iterator in range(len(income)):
                incomeHelper[iterator] = income[iterator]
            for iterator in range(len(numberOfPeople)):
                numberOfPeopleHelper[iterator] = numberOfPeople[iterator]
            sql = "INSERT INTO MainPriestPlaces (" \
                  "PriestID," \
                  "Place," \
                  "StartDate," \
                  "EndDate," \
                  "MunimentGenesisDate," \
                  "MunimentNumber," \
                  "MunimentIssuingAuthority," \
                  "Income," \
                  "NumberOfPeople" \
                  ") " \
                  "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (priestID, mainPriestPlaces[x], mainPriestStartDateHelper[x], mainPriestEndDateHelper[x], munimentGenesisDateHelper[x],
                   munimentNumberHelper[x], munimentIssuingAuthorityHelper[x], incomeHelper[x], numberOfPeopleHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # Qualifications
        howManyQualifications = len(priestDiplomaName)
        for x in range(howManyQualifications):
            priestDiplomaGenesisDateHelper = [""] * 15
            issuingAuthorityHelper = [""] * 15
            for iterator in range(len(priestDiplomaGenesisDate)):
                priestDiplomaGenesisDateHelper[iterator] = priestDiplomaGenesisDate[iterator]
            for iterator in range(len(issuingAuthority)):
                issuingAuthorityHelper[iterator] = issuingAuthority[iterator]
            sql = "INSERT INTO Qualifications (" \
                  "PriestID," \
                  "DiplomaName," \
                  "GenesisDate," \
                  "IssuingAuthority" \
                  ") " \
                  "VALUES (%s, %s, %s, %s)"
            if priestDiplomaGenesisDateHelper[x] == "":
                priestDiplomaGenesisDateHelper[x] = None
            val = (
                priestID, priestDiplomaName[x], priestDiplomaGenesisDateHelper[x], issuingAuthorityHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # ChurchOffices
        howManyChurchOffices = len(churchOfficesName)
        for x in range(howManyChurchOffices):
            churchOfficesStartDateHelper = [""] * 30
            churchOfficesEndDateHelper = [""] * 30
            churchOfficesCommentHelper = [""] * 30
            for iterator in range(len(churchOfficesStartDate)):
                churchOfficesStartDateHelper[iterator] = churchOfficesStartDate[iterator]
            for iterator in range(len(churchOfficesEndDate)):
                churchOfficesEndDateHelper[iterator] = churchOfficesEndDate[iterator]
            for iterator in range(len(churchOfficesComment)):
                churchOfficesCommentHelper[iterator] = churchOfficesComment[iterator]
            sql = "INSERT INTO ChurchOffices (" \
                  "PriestID," \
                  "Name," \
                  "StartDate," \
                  "EndDate," \
                  "Comment" \
                  ") " \
                  "VALUES (%s, %s, %s, %s, %s)"
            val = (
                priestID, churchOfficesName[x], churchOfficesStartDateHelper[x], churchOfficesEndDateHelper[x], churchOfficesCommentHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # OtherOffices
        howManyOtherOffices = len(otherOfficesName)
        for x in range(howManyOtherOffices):
            otherOfficesStartDateHelper = [""] * 30
            otherOfficesEndDateHelper = [""] * 30
            otherOfficesCommentHelper = [""] * 30
            for iterator in range(len(otherOfficesStartDate)):
                otherOfficesStartDateHelper[iterator] = otherOfficesStartDate[iterator]
            for iterator in range(len(otherOfficesEndDate)):
                otherOfficesEndDateHelper[iterator] = otherOfficesEndDate[iterator]
            for iterator in range(len(otherOfficesComment)):
                otherOfficesCommentHelper[iterator] = otherOfficesComment[iterator]
            sql = "INSERT INTO OtherOffices (" \
                  "PriestID," \
                  "Name," \
                  "StartDate," \
                  "EndDate," \
                  "Comment" \
                  ") " \
                  "VALUES (%s, %s, %s, %s, %s)"
            val = (
                priestID, otherOfficesName[x], otherOfficesStartDateHelper[x], otherOfficesEndDateHelper[x], otherOfficesCommentHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # LiteraryWorks
        howManyLiteraryWorks = len(literaryWorks)
        for x in range(howManyLiteraryWorks):
            literaryWorksCommentHelper = [""] * 30
            for iterator in range(len(literaryWorksComment)):
                literaryWorksCommentHelper[iterator] = literaryWorksComment[iterator]
            sql = "INSERT INTO LiteraryWorks (" \
                  "PriestID," \
                  "Title," \
                  "Comment" \
                  ") " \
                  "VALUES (%s, %s, %s)"
            val = (
                priestID, literaryWorks[x], literaryWorksCommentHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # DisciplinaryMatters
        howManyDisciplinaryMatters = len(disciplinaryMattersName)
        for x in range(howManyDisciplinaryMatters):
            disciplinaryMattersIssuingAuthorityHelper = [""] * 15
            for iterator in range(len(disciplinaryMattersIssuingAuthority)):
                disciplinaryMattersIssuingAuthorityHelper[iterator] = disciplinaryMattersIssuingAuthority[iterator]
            sql = "INSERT INTO DisciplinaryMatters (" \
                  "PriestID," \
                  "Name," \
                  "IssuingAuthority" \
                  ") " \
                  "VALUES (%s, %s, %s)"
            val = (
                priestID, disciplinaryMattersName[x], disciplinaryMattersIssuingAuthorityHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        # Suspensions
        howManysuspensions = len(suspensionsPunishment)
        for x in range(howManysuspensions):
            suspensionsStartDateHelper = [""] * 15
            suspensionsEndDateHelper = [""] * 15
            suspensionsDateAndNumberHelper = [""] * 15
            suspensionsCommentHelper = [""] * 15
            for iterator in range(len(suspensionsStartDate)):
                suspensionsStartDateHelper[iterator] = suspensionsStartDate[iterator]
            for iterator in range(len(suspensionsEndDate)):
                suspensionsEndDateHelper[iterator] = suspensionsEndDate[iterator]
            for iterator in range(len(suspensionsDateAndNumber)):
                suspensionsDateAndNumberHelper[iterator] = suspensionsDateAndNumber[iterator]
            for iterator in range(len(suspensionsComment)):
                suspensionsCommentHelper[iterator] = suspensionsComment[iterator]
            sql = "INSERT INTO Suspensions (" \
                  "PriestID," \
                  "StartDate," \
                  "EndDate," \
                  "Punishment," \
                  "DateAndNumber," \
                  "Comment" \
                  ") " \
                  "VALUES (%s, %s, %s, %s, %s, %s)"
            val = (
                priestID, suspensionsStartDateHelper[x], suspensionsEndDateHelper[x], suspensionsPunishment[x], suspensionsDateAndNumberHelper[x],
                     suspensionsCommentHelper[x])
            mycursor.execute(sql, val)
            mycursor.execute('COMMIT')

        cnx.close()
        i += 1
