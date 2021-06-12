require('dotenv').config()  
const redis = require('redis');
const { promisifyAll } = require('bluebird');
promisifyAll(redis);

const testRedisConnection = async () => {

    const client = redis.createClient({
        host: "redis",
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PW
    });
    client.on('error', err => {
        console.log('Error ' + err);
    });
    //await client.setAsync('foo', 'bar');
    const fooValue = await client.getAsync('name');
    return fooValue;
};

// testRedisConnection().then(data=>{
//     console.log(data);
// })
// these functions are exported for testing
module.exports = {
    testRedisConnection:testRedisConnection
};