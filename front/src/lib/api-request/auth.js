import httpRequest from "./http";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


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
  Cookies.set("token", token, { expires: 7, secure: true });
  setCommonHeader();
  return response;
}

export function logOut() {
  Cookies.remove('token');
}

function getJWT() {
  return Cookies.get('token');
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
