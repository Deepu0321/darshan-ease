import { api } from "./api";
export const bookingService = {
  mine: () => api.get("/bookings/me"),
  list: () => api.get("/bookings"),
  create: (data: unknown) => api.post("/bookings", data),
  cancel: (id: string) => api.post(`/bookings/${id}/cancel`, {}),
};