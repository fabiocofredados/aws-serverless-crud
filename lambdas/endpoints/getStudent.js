const Responses = require('../common/responses.js');
const Dynamo = require('../common/dynamo-repository.js');

const tableName = process.env.DYNAMODB_STUDENT_TABLE;
exports.handler = async event =>{

    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'ID is Required'});
    }
    let ID = event.pathParameters.ID;
    
    const student = await Dynamo.get(ID, tableName).catch(err => {
        return null;
    });

    if (!student){
        return Responses._404({message: `No Student found by ID: ${ID}`});
    }

    return Responses._200(student);
}