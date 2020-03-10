const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const UserCollection = require('../src/models/user');
const GroupChannelCollection = require('../src/models/groupChannel');
const MessageCollection = require('../src/models/message');
const generateToken = require('../src/utils/generateToken');
const { user1, user2, wrongId} = require('./mock');

const { createMockUser} = require('./utils');

const { assert } = chai;
chai.use(chaiHttp);

describe('User api', () => {
  let token;
  // let server;
  // before(async () => {
  //   server = createServer();
  // })
  beforeEach(async () => {
    await UserCollection.deleteMany({});
    await GroupChannelCollection.deleteMany({});
    await MessageCollection.deleteMany({});
    token = await generateToken({ id: user1._id });
  })

  describe('GET /user', () => {
    it('Should return 401 status', async () => {
      const getRes = await chai
        .request(server)
        .get('/user')
        .send();
      assert.equal(getRes.status, 401);
    });

    it('Should return all users', async () => {
      await createMockUser(user1);
      await createMockUser(user2);
      const getRes = await chai
        .request(server)
        .get(`/user`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.body.users.length, 2);
    });
  });

  describe('GET /user/:id', () => {
    it('Should return correct users', async () => {
      const user = await createMockUser(user1);
      await createMockUser(user2);
      const getRes = await chai
        .request(server)
        .get(`/user/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.body.user.name, user.name);
    });

    it('Should return status 404', async () => {
      const user = await createMockUser(user1);
      await createMockUser(user2);
      const getRes = await chai
        .request(server)
        .get(`/user/${wrongId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      assert.equal(getRes.status, 404);
    });
  });
});