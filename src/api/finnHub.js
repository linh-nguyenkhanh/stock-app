import axios from "axios";
const TOKEN = "cdv59tqad3i031m66fggcdv59tqad3i031m66fh0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
