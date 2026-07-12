import { api } from "./api";
export const donationService = {
  mine: () => api.get("/donations/me"),
  list: () => api.get("/donations"),
  create: (data: unknown) => api.post("/donations", data),
};