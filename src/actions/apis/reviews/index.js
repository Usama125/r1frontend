import { trackPromise } from "react-promise-tracker";
import axios from "../../../axios";

const reviews = {
  async getAllReviews() {
    try {
      const response = await trackPromise(axios.get("/reviews/get"));
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default reviews;
