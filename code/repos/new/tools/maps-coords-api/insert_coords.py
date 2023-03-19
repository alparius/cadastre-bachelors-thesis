import io
import pymongo

if __name__ == "__main__":
    my_client = pymongo.MongoClient("mongodb://localhost:27017/")
    my_db = my_client["kataszter"]
    my_coll = my_db["Parishes"]

    file_in = io.open("coordinates_revised.txt", "r", encoding="utf-8")
    data = [[field for field in line.split(';;')] for line in file_in]
    file_in.close()

    for row in data:
        name = row[1]
        lat = float(row[3])
        lng = float(row[4])
        result = my_coll.update_one({"name": name}, {"$set": {"coordinates.lat": lat, "coordinates.lng": lng}})
