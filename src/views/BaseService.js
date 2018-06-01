export default class BaseService {
  /**
   * Returns true is statusCode is 2xx.
   * @param {*} statusCode HTTP status code an integer
   */
  isSuccessStatus(statusCode) {
    return statusCode >= 200 && statusCode <= 299;
  }

  getApiFullUrl(endpoint) {
    if (!endpoint) return process.env.REACT_APP_API_BASE_URL;

    if (!endpoint.startsWith("/")) endpoint = "/" + endpoint;

    return process.env.REACT_APP_API_BASE_URL + endpoint;
  }

  apiError(msg) {
    return {
      status: false,
      message: msg
    };
  }

  apiSuccess(responseData) {
    if (responseData) {
      return {
        status: true,
        data: responseData.data
      };
    }
    return {
      status: true
    };
  }
}
