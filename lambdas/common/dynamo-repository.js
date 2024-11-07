const AWS = require('aws-sdk');
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const STAGE = process.env.STAGE;

let documentClient;

if (STAGE === "local") {
    documentClient = new AWS.DynamoDB.DocumentClient({
    endpoint: "http://localhost:4566",
    region: "local",
  });
} else {
    documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1",
  });
}

const DynamoRepo = {
    async get(ID, TableName){
        const params = {
            TableName,
            Key: {
                ID
            }
        };
        const data = await documentClient.get(params).promise()

        if (!data || !data.Item){
            throw Error(`There was an error fetching user by ID ${ID} of ${TableName}`);
        }
        
        return data.Item;
    },
    async getAll(TableName){
        const params = { TableName };
        const data = await documentClient.scan(params).promise()

        if (!data || !data.Items){
            throw Error(`There was an error fetching from ${TableName}`);
        }

        return data.Items;
    },
    async create(data, TableName){
        if (!data.ID){
            throw Error('no ID');
        }
        const params = {
            TableName,
            Item: data
        };
        const res = await documentClient.put(params).promise();
        if (!res){
            throw Error(`Error inserting user: ${data}`);
        }
        
        return data;
    },
    async update(data, TableName){
        if (!data.ID){
            throw Error('no ID');
        }
        const params = {
            TableName,
            Item: data
        };
        await documentClient.put(params).promise();

        return data.ID;

    },
    async delete(ID, TableName){
        const params = {
            TableName,
            Key: { ID }
        };
        await documentClient.delete(params).promise();

        return ID;
    }
};

module.exports = DynamoRepo;