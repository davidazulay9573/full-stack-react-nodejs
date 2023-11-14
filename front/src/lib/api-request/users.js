import httpRequest from "./http-request";
import jwtDecode from "jwt-decode";

const TOKEN_LS_KEY = "token";

function setCommonHeader() {
  httpRequest.setCommonHeader("x-auth-token", getJWT());
}
setCommonHeader();

export function createUser(user) {
  return httpRequest.post("/auth/sign-up", user);
}

export async function login(user) {
  const response = await httpRequest.post("/auth/sign-in", user);
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

function getLoggeronUser() {
  try {
    return jwtDecode(getJWT());
  } catch {
    return null;
  }
}
function getUser(id){
 return httpRequest.get(`/users/${id}`)
}
function getUsers() {
 return httpRequest.get('/users')
}

const userService = {
  createUser,
  login,
  logOut,
  getLoggeronUser,
  getUser,
  getUsers
};

export default userService;
