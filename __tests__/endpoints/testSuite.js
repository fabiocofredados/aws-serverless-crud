
const AWS = require("aws-sdk");
const axios = require("axios");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;


const STAGE = 'local';

let endpoint = "http://localhost:3000/local";
let dbClient;
let TableName = `students-${STAGE}`;;


dbClient = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://localhost:4566",
  region: STAGE,
});

const truncateStudentsTable = async () => {
  let data = await dbClient.scan({ TableName: TableName }).promise();

  for (const students of data.Items) {
    await dbClient
      .delete({
        TableName: TableName,
        Key: {
          ID: students.ID,
        },
      })
      .promise();
  }
};

beforeEach(async () => {
  await truncateStudentsTable();
});

test("get all Students returns empty list", async () => {
  const response = await axios.get(`${endpoint}/`);
  const expectedResult = [];
  expect(response.data).toEqual(expectedResult);
});

test("add student to database", async () => {
  const studentObject = {
    ID: "123",
    name: "Joaquim Osorio",
  };
  const addResponse = await axios.post(`${endpoint}/`, studentObject);
  expect(addResponse.status).toEqual(201);
  expect(addResponse.data).toEqual(studentObject);

  const getResponse = await axios.get(`${endpoint}/`);
  expect(getResponse.data).toEqual([studentObject]);
});

test("add student then update student from database", async () => {
  const ID = "123";
  const studentObject = {
    ID: ID,
    name: "Francisco Orellana",
  };
  const posResponse = await axios.post(`${endpoint}/`, studentObject);
  expect(posResponse.status).toEqual(201);
  expect(posResponse.data).toEqual(studentObject);

  const getResponse = await axios.get(`${endpoint}/`);
  expect(getResponse.data).toEqual([studentObject]);

  const newstudent = {
    name: "Hillary Gonzalez",
  };

  await axios.put(`${endpoint}/${ID}`, newstudent);
  const getResponseAfterUpdate = await axios.get(`${endpoint}/`);
  expect(getResponseAfterUpdate.data).toEqual([{ ID, ...newstudent }]);
});

test("add student then delete it from database", async () => {
  const ID = "123";
  const studentObject = {
    ID: ID,
    name: "my new student",
  };
  
  const posResponse = await axios.post(`${endpoint}/`, studentObject);
  expect(posResponse.status).toEqual(201);
  expect(posResponse.data).toEqual(studentObject);

  await axios.delete(`${endpoint}/${ID}`);
  const getResponseAfterDelete = await axios.get(`${endpoint}/`);
  expect(getResponseAfterDelete.data).toEqual([]);
});

