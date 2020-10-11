# beam-backend

In order to run the application,

1. You will need to clone the repository.
2. create a .env files in the root directory using the contents of the env.example file.
  - In this file you need to specify the connection string for mongodb.
3. Go to the terminal window and issue a command <code>"npm start"</code>
4. The application currently starts on port <b>9200</b>, you can change the port inside <b>config/config.js</b>
4. Once the application successfully starts up, you can test the endpoints using "http://localhost:9200".

# Testing the application

1. There is only ONE endpoint for this application namely <b>http://localhost:9200/api/v1/vehicle/search</b>
2. Pass the following parameters in JSON format: <code>{
    "long" : 103.7422865,
    "lat" : 1.33315262,
    "numBikes" : 2,
    "radius" : 50000}</code>
3. You may validate the number of vehicles returned are not more than the numBikes specified.


