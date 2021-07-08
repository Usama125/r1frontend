import { trackPromise } from "react-promise-tracker";
import axios from "../../../axios";

const bookingsApi = {
  async getAllBookings() {
    try {
      const response = await trackPromise(axios.get("/bookings/get"));
      return response;
    } catch (error) {
      return error;
    }
  },
  async getSingleBooking(id) {
    try {
      const response = await trackPromise(axios.get(`/bookings/single/${id}`));
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default bookingsApi;
