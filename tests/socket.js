// const ws = require('../src/ws');
// const http = require('http');
// const UserCollection = require('../src/models/user');
// const GroupChannelCollection = require('../src/models/groupChannel');
// const MessageCollection = require('../src/models/message');
// const {addChannel, createMockUser} = require('./utils');
// const {user1, message} = require('./mock');
// const generateToken = require('../src/utils/generateToken');

// const {assert} = require('chai');

// describe('Web socket tests', () => {
//   let server = undefined;
//   let token;

//   before((done) => {
//     server = http.createServer();
//     ws(server);
//     server.listen(8080, () => {
//       done();
//     })
//   });

//   beforeEach(async () => {
//     // await UserCollection.deleteMany({});
//     // await createMockUser(user1);
//     token = await generateToken({ id: user1._id });
//   })

//   after((done) => {
//     if (server) {
//       server.on('close', () => {
//         done();
//       });
//       server.close(() => {
//         server.unref();
//       });
//     }
//   });

//   it('Should return correct message', async (done) => {
//     const wsClient = require('socket.io-client')('http://localhost:8080', {query: { token }});
//     const { _id } = await addChannel();
//     const { text } = message;
//     wsClient.emit('message', {messValue: text, channelId: _id});
//     wsClient.on('addedMess', ({ addedMess }) => {
//       assert.equal(addedMess.text, text);
//       done();
//     });
//   });

//   // it('Should return correct data', async (done) => {
//   //   const wsClient1 = require('socket.io-client')('http://localhost:8080', {query: { token }});
//   //   const wsClient2 = require('socket.io-client')('http://localhost:8080', {query: { token }});
//   //   const { _id } = await addChannel();
//   //   const { text } = message;
//   //   wsClient1.emit('message', {text, _id });
//   //   wsClient2.on('addedMessChannel', ({ addedMess, channelId }) => {
//   //     assert.equal(addedMess.text, text);
//   //     assert.equal(channelId, _id);
//   //     done();
//   //   })
//   // })
// });