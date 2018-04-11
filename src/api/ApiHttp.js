const axios = require('axios');
const logger = require('../../build/lib/logger');
const config = require('../../config');

const getUrl = (params) => {
  let url = config.BASE_API;
  switch (params.context) {
    case 'teams':
      url += '/api/teams';
      if (params.query) {
        url +=`/${params.query}`;
      }
      return url;
    case 'training':
      url += '/api/training'
      if (params.query) {
        url +=`/${params.query}`;
      }
      return url;
    case 'assets':
      url += '/api/assets'
      if (params.query) {
        url +=`/${params.query}`;
      }
      return url;
    case 'onboard':
      url +='/api/onboard'
      return url;
    default:
      return false;
  }

};

const getAPIData = (params) => {
  const url = getUrl(params);
  const option = {};
  console.log(params);
  option.method = params.method;
  option.url = url;
  if (params.postdata) {
    option.data = JSON.stringify(params.postdata);
    option.headers = {
      'Content-Type': 'application/json'
    };
    option.json = true;
  }
  return axios(option)
  .then(response => response)
  .then(
    response => {
      return response.data
    },
    error => {
      logger.error('Api failed for ' + url + ' Error message: ' + error);
    }
  )
  .catch(function(error) {
console.log('There has been a problem with your fetch operation: ' + error.message);
 // ADD THIS THROW error
  throw error;
});
};

module.exports = getAPIData;
