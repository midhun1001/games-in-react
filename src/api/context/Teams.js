const getAPIData = require('../ApiHttp');

const getTeams = async (path) => {
  const apiParams = {
    context: 'teams',
    method: 'GET'
  };
  if (path.includes('?')) {
    const Bu = path.split('?')[1].split('=')[1];
    apiParams.query = Bu;
  }
  const response = await getAPIData(apiParams);
  return response;
};
const Teams = {
  getTeams
};

module.exports = Teams;
