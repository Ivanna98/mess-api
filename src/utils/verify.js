const axios = require('axios');

const verify = async (token) => {
  const options = {
    method: 'GET',
    url: 'https://oauth2.googleapis.com/tokeninfo',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const googleInfo = await axios(options);
  return googleInfo.data.sub || null;
};

module.exports = verify;
