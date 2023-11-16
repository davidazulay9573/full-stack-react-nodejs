import httpRequest from "./http";
import jwtDecode from "jwt-decode";

const TOKEN_LS_KEY = "token";

function setCommonHeader() {
  httpRequest.setCommonHeader("x-auth-token", getJWT());
}
setCommonHeader();

export function createUser(user) {
  return httpRequest.post("/auth/auth/sign-up", user);
}

export async function login(user) {
  const response = await httpRequest.post("/auth/auth/sign-in", user);
  const token = await response.data.token;
  localStorage.setItem(TOKEN_LS_KEY, token);
  setCommonHeader();
  return response;
}

export function logOut() {
  localStorage.removeItem(TOKEN_LS_KEY);
}

function getJWT() {
  return localStorage.getItem(TOKEN_LS_KEY);
}

function getLoggedonUser() {
  try {
    return jwtDecode(getJWT());
  } catch {
    return null;
  }
}

const authService = {
  createUser,
  login,
  logOut,
  getLoggedonUser,
};

export default authService;
