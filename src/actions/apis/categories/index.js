import { trackPromise } from "react-promise-tracker";
import axios from "../../../axios";

const categoriesApi = {
  async getAllCategories() {
    try {
      const response = await trackPromise(axios.get("/categories/get"));
      return response;
    } catch (error) {
      return error;
    }
  },
  async createCategory(body) {
    try {
      const response = await trackPromise(axios.post("/categories/create", body));
      return response;
    } catch (error) {
      return error;
    }
  },
  async getSingleCategory(id) {
    try {
      const response = await trackPromise(axios.get(`/categories/single/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  },
  async updateCategory(id, body) {
    try {
      const response = await trackPromise(axios.put(`/categories/update/${id}`, body));
      return response;
    } catch (error) {
      return error;
    }
  },
  async deleteCategory(id) {
    try {
      const response = await trackPromise(axios.delete(`/categories/delete/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default categoriesApi;
