const Responses = {
    _200(data={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 200,
            body: JSON.stringify(data)
        }
    },
    _201(data={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 201,
            body: JSON.stringify(data)
        }
    },
    _204(data={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 204,
            body: JSON.stringify(data)
        }
    },
    _400(data={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 400,
            body: JSON.stringify(data)
        }
    },
    _404(data={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 404,
            body: JSON.stringify(data)
        }
    }
};

module.exports = Responses;