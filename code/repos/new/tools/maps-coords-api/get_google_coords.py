import io
import requests
import pymongo

# api-endpoint
URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"


def request_maps(location):
    # defining a params dict for the parameters to be sent to the API
    PARAMS = {
        "input": location,
        "inputtype": "textquery",
        "fields": "formatted_address,name,geometry/location",
        "language": "hu",
        "locationbias": "locationbias=circle:40000@46.765613,23.620543",
        "key": "[secret]"
    }

    # sending get request and saving the response as response object
    r = requests.get(url=URL, params=PARAMS)
    # extracting data in json format
    return r.json()


if __name__ == "__main__":
    my_client = pymongo.MongoClient("mongodb://localhost:27017/")
    my_db = my_client["kataszter"]
    my_coll = my_db["Parishes"]

    file_out = io.open("coordinates_all.txt", "w", encoding="utf-8")

    i = 0
    for x in my_coll.find():
        i = i + 1
        print(i)

        if "name" in x:
            data = request_maps(x["name"])

            if "candidates" in data:
                if len(data["candidates"]) > 0:
                    if "formatted_address" in data["candidates"][0] and "geometry" in data["candidates"][0]:
                        # extracting latitude, longitude and formatted address of the first matching location
                        addr = data["candidates"][0]["formatted_address"]
                        lat = data["candidates"][0]["geometry"]["location"]["lat"]
                        lng = data["candidates"][0]["geometry"]["location"]["lng"]

                        file_out.write(str(x["_id"]) + ";;" + x["name"] + ";;" + addr + ";;" + str(lat) + ";;" + str(lng) + "\n")

    file_out.close()
