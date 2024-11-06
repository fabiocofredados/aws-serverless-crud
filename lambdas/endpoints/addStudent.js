const Responses = require('../common/responses.js');
const DynamoRepo = require('../common/dynamo-repository.js');

const tableName = process.env.DYNAMODB_STUDENT_TABLE;
exports.handler = async event =>{
    const student = JSON.parse(event.body);
    
    const newStudent = await DynamoRepo.create(student, tableName)
    .catch(err => {
        return null;
    });
    if (!newStudent){
        return Responses._400({message: `Failed to save new Student: ${student}`});
    }

    return Responses._201(newStudent);
}