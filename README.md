# Weather API

This RESTful API built with Nest.js fetches weather data from an external API and stores it in a MongoDB Atlas database. The API allows users to retrieve paginated weather data.

## Prerequisites

Ensure the following are installed on your machine:

- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account (for database)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hridoymahmud71/hridoy-weather-api.git

2. Install dependencies:
    ```bash
     cd weather-api
     npm install

## Configuration

1. Create a .env file in the root directory:

    ```
      MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
      WEATHER_FETCH_INTERVAL=0 * * * *  // Cron expression for weather  data fetching interval
      LAT=23.80 //provide latitude
      LONG=90.41 // provide longitude
    ```
2. Replace username, password, cluster, and database with your MongoDB Atlas credentials.


## Usage
Start the server:
  ```bash     
    npm start
  ```     

The server will run at http://localhost:3000 by default.


## Endpoints
- Get Weather Data
- URL: /weather
- Method: GET
- Query Parameters:
  - page (default: 1)
  - limit (default: 10)
- Description: Retrieves paginated weather data.

## Testing

To test the API endpoints, you can use tools like curl, Postman, or a web browser:

```bash     
curl http://localhost:3000/weather?page=1&limit=10
``` 

  To execute the end-to-end tests using Jest with a specific configuration file, use the following command:
  ```bash 
  npx jest --config=test/jest-e2e.json
  ``` 
This command will initiate Jest, leveraging the configuration file jest-e2e.json located in the test directory to run your end-to-end tests.
   