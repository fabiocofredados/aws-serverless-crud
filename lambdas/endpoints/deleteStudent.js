const Responses = require('../common/responses.js');
const Dynamo = require('../common/dynamo-repository.js');

const tableName = process.env.DYNAMODB_STUDENT_TABLE;
exports.handler = async event =>{

    if (!event.pathParameters || !event.pathParameters.ID){
        return Responses._400({message: 'ID is Required'});
    }
    let ID = event.pathParameters.ID;
    
    const student = await Dynamo.delete(ID, tableName).catch(err => {
        console.log('Error removing by ID from Dynamo DB',err);
        return null;
    });

    if (!student){
        return Responses._404({message: 'Not found Student to be removed'});
    }

    return Responses._204();
}