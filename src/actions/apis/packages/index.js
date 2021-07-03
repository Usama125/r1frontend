import { trackPromise } from "react-promise-tracker";
import axios from "../../../axios";

const packagesApi = {
  async getAllPackages() {
    try {
      const response = await trackPromise(axios.get("/packages/get"));
      return response;
    } catch (error) {
      return error;
    }
  },
  async createPackage(body) {
    try {
      const response = await trackPromise(axios.post("/packages/create", body));
      return response;
    } catch (error) {
      return error;
    }
  },
  async getSinglePackage(id) {
    try {
      const response = await trackPromise(axios.get(`/packages/single/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  },
  async updatePackage(id, body) {
    try {
      const response = await trackPromise(axios.put(`/packages/update/${id}`, body));
      return response;
    } catch (error) {
      return error;
    }
  },
  async deletePackage(id) {
    try {
      const response = await trackPromise(axios.delete(`/packages/delete/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default packagesApi;
