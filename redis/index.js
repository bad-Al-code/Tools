import { createClient } from 'redis';

const client = createClient({});

client.on('error', (err) => console.log('Redis err: ', err));

await client.connect();

await client.set('key', 'askldj');
const value = await client.get('key');

console.log(value);

await client.hSet('user-session:124', {
    name: 'a',
    age: 23,
});

let userSession = await client.hGetAll('user-session:124');
console.log(JSON.stringify(userSession));

const res3 = await client.hSet('myhash', {
    field2: 'Hi',
    field3: 'World',
});
console.log(res3);
