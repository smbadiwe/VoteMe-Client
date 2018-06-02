/**
 * Returns true is statusCode is 2xx.
 * @param {*} statusCode HTTP status code an integer
 */
export const isSuccessStatus = statusCode => {
  return statusCode >= 200 && statusCode <= 299;
};

export const getApiFullUrl = endpoint => {
  if (!endpoint) return process.env.REACT_APP_API_BASE_URL;

  if (!endpoint.startsWith("/")) endpoint = "/" + endpoint;

  return process.env.REACT_APP_API_BASE_URL + endpoint;
};

export const apiError = msg => {
  if (!msg) msg = "Falure authenticating. Please try again later.";
  return {
    status: false,
    message: msg
  };
};

export const apiSuccess = responseData => {
  if (responseData) {
    return {
      status: true,
      data: responseData.data
    };
  }
  return {
    status: true
  };
};

export const callApi = async (postData, endpoint) => {
  try {
    const response = await axios.post(getApiFullUrl(endpoint), postData);
    if (isSuccessStatus(response.status)) {
      return apiSuccess(response.data);
    }
    return apiError(response.message);
  } catch (e) {
    console.log(e);
    return apiError();
  }
};
