import { api } from "./api";
export const templeService = {
  list: () => api.get("/temples"),
  get: (id: string) => api.get(`/temples/${id}`),
  create: (data: unknown) => api.post("/temples", data),
  update: (id: string, patch: unknown) => api.put(`/temples/${id}`, patch),
  remove: (id: string) => api.del(`/temples/${id}`),
};