const getAPIData = require('../ApiHttp');

const getAssets = async() => {
  const apiParams = {
    context: 'assets',
    method: 'GET',
  };
  const response = await getAPIData(apiParams);
  return response;
};

const newAsset = async(postdata) => {
  const apiParams = {
    context: 'assets',
    query: 'add',
    method: 'POST',
    postdata
  };
  const response = await getAPIData(apiParams);
  return response;
};
const deleteAsset = async (path) => {
  const apiParams = {
    context: 'assets',
    method: 'delete'
  };
  if (path.includes('?')) {
    const id = path.split('?')[1].split('=')[1];
    apiParams.query = id;
  }
  const response = await getAPIData(apiParams);
  return response;
}

const Assets = {
  getAssets,
  newAsset,
  deleteAsset
};

module.exports = Assets;
