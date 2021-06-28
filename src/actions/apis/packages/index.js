import axios from "../../../axios";

const packagesApi = {
  async getAllPackages() {
    try {
      const response = await axios.get("/packages/get");
      return response;
    } catch (error) {
      return error;
    }
  },
  async createPackage(body) {
    try {
      const response = await axios.post("/packages/create", body);
      return response;
    } catch (error) {
      return error;
    }
  },
  async getSinglePackage(id) {
    try {
      const response = await axios.get(`/packages/single/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  async updatePackage(id, body) {
    try {
      const response = await axios.put(`/packages/update/${id}`, body);
      return response;
    } catch (error) {
      return error;
    }
  },
  async deletePackage(id) {
    try {
      const response = await axios.delete(`/packages/delete/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default packagesApi;
