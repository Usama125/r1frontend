import axios from "../../../axios";

const reviews = {
  async getAllReviews() {
    try {
      const response = await axios.get("/reviews/get");
      return response;
    } catch (error) {
      return error;
    }
  }
};

export default reviews;
