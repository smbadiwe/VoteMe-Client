import axios from "axios";

export const isObjectEmpty = obj => {
  return Object.keys(obj).length === 0;
};

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

/**
 *
 * @param {*} data
 * @param {*} endpoint
 * @param {*} doPOST If true, request is HTTP POST; otherwise, GET
 */
export const callApi = async (data, endpoint, doPOST = true) => {
  try {
    const response = doPOST
      ? await axios.post(getApiFullUrl(endpoint), data)
      : await axios.get(getApiFullUrl(endpoint), {
          params: data
        });
    if (isSuccessStatus(response.status)) {
      return apiSuccess(response.data);
    }
    return apiError(response.message);
  } catch (e) {
    console.log(e);
    return apiError(e.message);
  }
};

export const isValid = (component, errors, doAll, field, updateState = true) => {
  if (updateState) {
    component.setState({ errors: errors });
  }
  if (doAll) {
    for (const i in errors) {
      if (errors[i].length > 0) {
        return false;
      }
    }
    return true;
  }

  if (!field)
    throw new Error(
      "Wrong usage of API. if doAll is falsy, then field must refer to a property in the errors object"
    );

  return errors[field].length === 0;
};
