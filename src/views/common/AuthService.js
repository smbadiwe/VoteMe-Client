import decode from "jwt-decode";
import { getApiFullUrl, isSuccessStatus, apiSuccess, apiError } from "./utils";
import axios from "axios";

const ID_TOKEN_KEY = "id_token";
const USER_INFO_KEY = "access_token";

export async function login(username, password, rememberme = false) {
  // Get a token from api server using the fetch api
  const url = getApiFullUrl("/login");
  const postData = { username: username, password: password, rememberme: rememberme };
  // performs api calls sending the required authentication headers
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + getIdToken()
  };

  try {
    console.log("POSTing for login at " + url);
    const response = await axios.post(url, postData, { headers: headers });
    // const response = {
    //   status: 200,
    //   data: { idToken: "idToken", accessToken: "accessToken" }
    // };

    console.log("axios result");
    console.log(response);
    console.log("done axios result");

    if (isSuccessStatus(response.status)) {
      setIdToken(response.data.token);
      setUserInfo(response.data.user);
      return apiSuccess();
    }
    return apiError(response.data);
  } catch (e) {
    console.log(e.response.data);
    return apiError(e.response.data);
  }
}

export function isAuthorized(componentName) {
  console.log(componentName);
  return false;
}

export function logout() {
  clearIdToken();
  clearUserInfo();
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
}

export function setIdToken(idToken, rememberme = false) {
  // Saves user token to localStorage
  if (idToken) {
    if (rememberme) localStorage.setItem(ID_TOKEN_KEY, idToken);
    else sessionStorage.setItem(ID_TOKEN_KEY, idToken);
  }
}

export function getIdToken() {
  let token = localStorage.getItem(ID_TOKEN_KEY);
  if (!token) token = sessionStorage.getItem(ID_TOKEN_KEY);
  return token;
}

export function getUserInfo() {
  let token = localStorage.getItem(USER_INFO_KEY);
  if (!token) token = sessionStorage.getItem(USER_INFO_KEY);
  return token;
}

function clearIdToken() {
  localStorage.removeItem(ID_TOKEN_KEY);
  sessionStorage.removeItem(ID_TOKEN_KEY);
}

function clearUserInfo() {
  localStorage.removeItem(USER_INFO_KEY);
  sessionStorage.removeItem(USER_INFO_KEY);
}

// Get and store access_token in local storage
export function setUserInfo(accessToken, rememberme = false) {
  if (rememberme) localStorage.setItem(USER_INFO_KEY, accessToken);
  else sessionStorage.setItem(USER_INFO_KEY, accessToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedIdToken) {
  const token = decode(encodedIdToken);
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
