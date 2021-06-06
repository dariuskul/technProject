import axios from "axios";

const URL = "https://coder-media-backend.herokuapp.com/outer_service/tweets";

export const getTweets = (query, page, next) =>
  axios.get(
    `${URL}?search=${query}&count=${page || 0}&${next ? `next_id=${next}` : ""}`
  );
