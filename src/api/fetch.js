import axios from 'axios';
import config from '../../config';


const fetchAPi = (url, types, postData = null) => (dispatch) => {
  const [REQUEST, SUCCESS, FAILURE] = types;
  const apiurl = `${config.BASE_URL}${url}`;
  dispatch({ // On request starts
    type: REQUEST
  });
  const apiConfig = {
    url: apiurl,
    timeout: 10000
  };
  if (postData) {
    apiConfig.method = 'POST';
    apiConfig.data = postData;
  }
  return axios(apiConfig)
    .then(response => response)
    .then(
      response => { // Once success response
        dispatch({
          type: SUCCESS,
          response: response.data
        });
      },
      error => { // in case of fail
        dispatch({
          type: FAILURE,
          message: error
        });
      }
    );
  return null;
};

export default fetchAPi;
