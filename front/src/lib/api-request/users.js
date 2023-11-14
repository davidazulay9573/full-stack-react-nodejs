import httpService from "./http-request";
import jwtDecode from "jwt-decode";

const TOKEN_LS_KEY = "token";

function setCommonHeader() {
  httpService.setCommonHeader("x-auth-token", getJWT());
}
setCommonHeader();

export function createUser(user) {
  return httpService.post("/auth/sign-up", user);
}

export async function login(user) {
  const response = await httpService.post("/auth/sign-in", user);
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

function getUser() {
  try {
    return jwtDecode(getJWT());
  } catch {
    return null;
  }
}

const userService = {
  createUser,
  login,
  logOut,
  getUser,
};

export default userService;
