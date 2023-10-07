import backendAPI from "../utils/backendAPI";

export default {
  updateUserInfo: (id, body) => backendAPI.put(`/user/${id}`, body),
  getUserById: (id) => backendAPI.get(`/user/${id}`),
};
