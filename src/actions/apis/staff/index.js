import axios from "../../../axios";

const staffApi = {
  async getAllstaff() {
    try {
      const response = await axios.get("/staff/get");
      return response;
    } catch (error) {
      return error;
    }
  },
  async createStaff(body) {
    try {
      const response = await axios.post("/staff/create", body);
      return response;
    } catch (error) {
      return error;
    }
  },
  async getSingleStaff(id) {
    try {
      const response = await axios.get(`/staff/single/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  async updateStaff(id, body) {
    try {
      const response = await axios.put(`/staff/update/${id}`, body);
      return response;
    } catch (error) {
      return error;
    }
  },
  async deleteStaff(id) {
    try {
      const response = await axios.delete(`/staff/delete/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
};

export default staffApi;
