import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

console.log(process.env);

const BASE_URL = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
});

export default baseQuery;
