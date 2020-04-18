const axios = require('axios');
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const FB_USER_ID = process.env.FB_USER_ID;
/*
https://codepen.io/knitesh/full/VwvYyaQ
Test User:
uid: bill_qlinroi_latest@tfbnw.net
pwd: passw0rd123
*/

async function getLongTermAccessToken(options) {
  try {
    const response = await axios.get(
      'https://graph.facebook.com/oauth/access_token',
      { params: options }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getManagePageList(user_id, options) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/${user_id}/accounts`,
      { params: options }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
/*https://graph.facebook.com/v6.0/me/accounts*/

async function getPageList(options) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v6.0/me/accounts`,
      { params: options }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  postAccessTokenRequest(request, response) {
    const access_token = request.body.access_token;
    const user_id = request.body.user_id;

    console.log(user_id);

    const params = {
      grant_type: 'fb_exchange_token',
      client_id: APP_ID,
      client_secret: APP_SECRET,
      fb_exchange_token: access_token,
      access_token: access_token,
    };
    try {
      getLongTermAccessToken(params).then((result) => response.json(result));
    } catch (error) {
      response.json({
        error: '⚠️ Not able to get Long Term Access Token.',
      });
    }
  },
  /*
    "https://graph.facebook.com/{user-id}/accounts?
    fields=name,access_token&
    access_token={user-accesss-token}"
    */
  getManagePageListRequest(request, response) {
    const access_token = request.body.access_token;

    const options = {
      fields: 'name,access_token',
      access_token,
    };

    try {
      getManagePageList(FB_USER_ID, options).then((result) =>
        response.json(result)
      );
    } catch (error) {
      response.json({
        error: '⚠️ Not able to get Page List.',
      });
    }
  },
  /* 
    curl -i -X GET \
 "https://graph.facebook.com/v6.0/me/accounts?access_token=EAAHCrUK3hDABANKn9Sck8fgMqvxsRCPYsOxsaArI9ZAXS2yzEGTt6Iv2QJ8vxMkZBZAlZBZAih6nPMNphcU1mRHzLAy1mIz9mksm6SMF7xVuwosF1iq20Thwj5JMIY9LJHHZAfB4nzkywXvC7L02D8ENO6bAHE11wWZCWUZAWnvy2DBC53xuGCMIw3IcZAq5tZCUouXa1JS0QJOdxcAn6kR1xS"
 */

  getPageListRequest(request, response) {
    const access_token = request.body.access_token;

    const options = {
      access_token,
    };

    try {
      getPageList(options).then((result) => response.json(result));
    } catch (error) {
      response.json({
        error: '⚠️ Not able to get Page List.',
      });
    }
  },
  /*
    curl -i -X POST "https://graph.facebook.com/{page-id}/feed
  ?message=Hello World!
  &access_token={page-access-token}"
  */
  /* verify your postAccessTokenRequest
 curl -i -X GET "https://graph.facebook.com/{page-id}/feed
     ?access_token={page-access-token}"
     */
};
