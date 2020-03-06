const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const generateToken = require('../src/utils/generateToken');
const { user1, updateChannel, wrongId } = require('./mock');

const { createMockUser, addChannel, addMessage, getMess} = require('./utils');

const { assert } = chai;
chai.use(chaiHttp);

describe('Channels api', () => {
  let token;

  beforeEach(async () => {
    await UserCollection.deleteMany({});
    await GroupChannelCollection.deleteMany({});
    await MessageCollection.deleteMany({});
    await createMockUser(user1);
    token = await generateToken({ id: user1._id });
  })

  describe('GET /channels', () => {
    it('Should return 401 status', async () => {
      await addChannel();
      const getRes = await chai
        .request(server)
        .get('/channels')
        .send();
      assert.equal(getRes.status, 401);
    });

    it('Should return all channels', async () => {
      await addChannel();
      await addChannel();
      const getRes = await chai
        .request(server)
        .get('/channels')
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.lengthOf(getRes.body.channels, 2);
    });
  });
  describe('GET /channels/:id', () => {
    it('Should return correct data', async () => {
      const channel = await addChannel();
      const getRes = await chai
        .request(server)
        .get(`/channels/${channel._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.status, 200);
      assert.equal(getRes.body.channel.title, channel.title);
    });
    it('Should return status 404', async () => {
      const channel = await addChannel();
      const getRes = await chai
        .request(server)
        .get(`/channels/${wrongId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.status, 404);
    });
  });
  describe('PUT /channels/:id', () => {
    it('Should return new data', async () => {
      const channel = await addChannel();
      const putRes = await chai
        .request(server)
        .put(`/channels/${channel._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateChannel);
      assert.equal(putRes.status, 200);
      assert.equal(putRes.body.updateChannel.title, updateChannel.title);
    });
  });
  describe('DELETE /channels/:id', () => {
    it('Should return status 200 and delete message', async () => {
      const channel = await addChannel();
      await addMessage(channel._id);
      await addMessage(channel._id);
      const deleteRes = await chai
        .request(server)
        .delete(`/channels/${channel._id}`)
        .set('Authorization', `Bearer ${token}`);
      assert.equal(deleteRes.status, 200);
      const messages = await getMess(channel._id);
      assert.equal(messages.length, 0);
    });
  });

});