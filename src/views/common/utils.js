import axios from "axios";
import { setIdToken } from "./AuthService";
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

export function apiError(msg) {
  if (!msg) msg = "Falure authenticating. Please try again later.";
  return {
    status: false,
    message: msg
  };
}

export function apiSuccess(responseData) {
  if (responseData) {
    return {
      status: true,
      data: responseData
    };
  }
  return {
    status: true
  };
}

/**
 *
 * @param {*} data
 * @param {*} endpoint
 * @param {*} doPOST If true, request is HTTP POST; otherwise, GET
 */
export async function callApi(data, endpoint, doPOST = true) {
  try {
    const response = doPOST
      ? await axios.post(getApiFullUrl(endpoint), data)
      : await axios.get(getApiFullUrl(endpoint), {
          params: data
        });
    console.log("axios response: ");
    console.log(response);
    if (response.headers) {
      const newToken = response.herders["x-sign"];
      setIdToken(newToken);
    }
    if (isSuccessStatus(response.status)) {
      return apiSuccess(response.data);
    }
    return apiError(response.message || response.statusText);
  } catch (e) {
    if (e.response && e.response.headers) {
      const newToken = e.response.herders["x-sign"];
      setIdToken(newToken);
    }
    console.log(e.response);
    return apiError(e.response.data);
  }
}

export function isValid(component, errors, doAll, field, updateState = true) {
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
}
