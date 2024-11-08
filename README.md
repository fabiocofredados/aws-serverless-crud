# Students CRUD API

## Requirements
1. Create/Use an account on [AWS](https://aws.amazon.com/)
2. Configure the [AWS credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
3. Install [Docker](https://docs.docker.com/engine/install/) including docker compose


## To do the tests locally

### Start the service locally

- docker compose up
- npm run deploy-local

### Add first student
curl --location 'http://localhost:3000/local' --header 'Content-Type: application/json' --data '{ "ID": "1616", "name": "Harryson Ford"}'

### Add second student
curl --location 'http://localhost:3000/local' --header 'Content-Type: application/json' --data '{ "name": "Sarah Oconnor","ID": "2626" }'

### Update a student 
curl --location --request PUT 'http://localhost:3000/local/1616' --header 'Content-Type: application/json' --data '{ "ID": "1616", "name": "Harryson Ford High King" }'

### Retrieve All students 
curl --location 'http://localhost:3000/local'

### Retrieve a student by ID
curl --location 'http://localhost:3000/local/1616'

### Delete a student
curl --location --request DELETE 'http://localhost:3000/local/2626'


## Run automated tests

To run the tests, first run the steps on "Start the service locally", and then:

-- npm run test-local


## Deploy in AWS

-- npm run deploy-staging

-- npm run deploy-production

## Run the endpoints on AWS

The same curl commands are valid, you just need to change the location value for the related Lambda endpoint.