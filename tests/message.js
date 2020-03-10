const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const generateToken = require('../src/utils/generateToken');
const { user1} = require('./mock');

const { createMockUser, addChannel, addMessage} = require('./utils');

const { assert } = chai;
chai.use(chaiHttp);

describe('Message api', () => {
  let token;
  // let server;
  // before(async () => {
  //   server = await createServer();
  // })
  beforeEach(async () => {
    await UserCollection.deleteMany({});
    await GroupChannelCollection.deleteMany({});
    await MessageCollection.deleteMany({});
    await createMockUser(user1);
    token = await generateToken({ id: user1._id });
  })

  describe('GET /message', () => {
    it('Should return 401 status', async () => {
      const channel = await addChannel();
      await addMessage(channel._id);
      const getRes = await chai
        .request(server)
        .get('/message')
        .send();
      assert.equal(getRes.status, 401);
    });

    it('Should return messages', async () => {
      const channel = await addChannel();
      await addMessage(channel._id);
      await addMessage(channel._id);
      const getRes = await chai
        .request(server)
        .get(`/message?channel=${channel._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.body.messages.length, 2);
    });
  });
});