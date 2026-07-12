import { api } from "./api";
export const userService = {
  list: () => api.get("/users"),
  get: (id: string) => api.get(`/users/${id}`),
  update: (id: string, patch: unknown) => api.put(`/users/${id}`, patch),
  remove: (id: string) => api.del(`/users/${id}`),
};