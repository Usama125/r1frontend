import axios from "../../../axios";

const user = {
  async login(email, password) {
    try {
      const response = await axios.post("/users/login", { email, password });
      return response;
    } catch (error) {
      return error;
    }
  },
  async getAllUsers() {
    try {
      const response = await axios.get("/users/get/all");
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default user;
