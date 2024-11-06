const Responses = require('../common/responses.js');
const Dynamo = require('../common/dynamo-repository.js');

const tableName = process.env.DYNAMODB_STUDENT_TABLE;
exports.handler = async event =>{
    const students = await Dynamo.getAll(tableName).catch(err => {
        return null;
    });

    return Responses._200(students);
}