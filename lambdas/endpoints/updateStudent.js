const Responses = require('../common/responses.js');
const Dynamo = require('../common/dynamo-repository.js');

const tableName = process.env.DYNAMODB_STUDENT_TABLE;
exports.handler = async event =>{
    
    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'ID is Required'});
    }
    let ID = event.pathParameters.ID;
    let student = JSON.parse(event.body);
    student.ID = ID;
    
    const updatedStudent = await Dynamo.update(student, tableName).catch(err => {
        console.log('Error updating Student into Dynamo DB',err);
        return null;
    });

    if (!updatedStudent){
        return Responses._404({message: 'Student not found to be updated'});
    }

    return Responses._204();
}