const getAPIData = require('../ApiHttp');

const getTraining = async(path) => {
  const apiParams = {
    context: 'training',
    method: 'GET'
  };
  if (path.includes('?')) {
    const Bu = path.split('?')[1].split('=')[1];
    apiParams.query = Bu;
  }
  const response = await getAPIData(apiParams);
  return response;
};

const Training = {
  getTraining
};

module.exports = Training;
