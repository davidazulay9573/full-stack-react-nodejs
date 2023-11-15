import httpRequest from "./http";

function getUser(id) {
  return httpRequest.get(`/users/${id}`);
}
function getUsers(search) {
  const path = search ? `/users?search=${search}` : '/users';
  return httpRequest.get(path);
}

function followAndDisFollow(id) {
  return httpRequest.patch(`/users/${id}`);
}

const userService = {
  getUser,
  getUsers,
  followAndDisFollow,
};

export default userService;
