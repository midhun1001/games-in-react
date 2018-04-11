const getAPIData = require('../ApiHttp');

const getDetails = async() => {
  const apiParams = {
    method : 'GET',
    context : 'onboard',
  };
  const response = await getAPIData(apiParams);
  return response;
}

const Onboard = {
  getDetails
};

module.exports = Onboard;
