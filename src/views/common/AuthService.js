import decode from "jwt-decode";
import { getApiFullUrl, isSuccessStatus, apiSuccess, apiError } from "../common/utils";
import axios from "axios";

const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

export async function login(username, password, rememberme = false) {
  // Get a token from api server using the fetch api
  const url = getApiFullUrl("/auth/login");
  const postData = {
    username: username,
    password: password,
    rememberme: rememberme
  };
  // performs api calls sending the required authentication headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  // Setting Authorization header
  // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
  if (isLoggedIn()) {
    headers["Authorization"] = "Bearer " + getIdToken();
  }
  try {
    const response = await axios.post(url, postData, { headers: headers });
    // const response = {
    //   status: 200,
    //   data: { idToken: "idToken", accessToken: "accessToken" }
    // };

    if (isSuccessStatus(response.status)) {
      setIdToken(response.data.idToken);
      setAccessToken(response.data.accessToken);
      return apiSuccess(response.data);
    }
    return apiError(response.message);
  } catch (e) {
    console.log(e);
    return apiError(e.message);
  }
}

export function logout() {
  clearIdToken();
  clearAccessToken();
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
}

function setIdToken(idToken) {
  // Saves user token to localStorage
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Get and store access_token in local storage
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  try {
    const expirationDate = getTokenExpirationDate(token);

    console.log("expirationDate = " + expirationDate);
    return expirationDate && expirationDate < new Date();
  } catch (e) {
    //console.log(e);
    return false;
  }
}
