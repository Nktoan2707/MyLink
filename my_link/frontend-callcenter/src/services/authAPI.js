import backendAPI from "../utils/backendAPI";

export default {
  signin: (username, password) => backendAPI.post("/signin", { username, password }),
};
