import { trackPromise } from "react-promise-tracker";
import axios from "../../../axios";

const usersApi = {
  async login(email, password) {
    try {
      const response = await trackPromise(axios.post("/users/login", { email, password }));
      return response;
    } catch (error) {
      return error;
    }
  },
  async getAllUsers() {
    try {
      const response = await trackPromise(axios.get("/users/get/all"));
      return response;
    } catch (error) {
      return error;
    }
  },
  async deleteUser(id) {
    try {
      const response = await trackPromise(axios.delete(`/users/delete/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default usersApi;
