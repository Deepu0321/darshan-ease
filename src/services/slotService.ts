import { api } from "./api";
export const slotService = {
  listForTemple: (templeId: string) => api.get(`/temples/${templeId}/slots`),
  create: (data: unknown) => api.post("/slots", data),
  update: (id: string, patch: unknown) => api.put(`/slots/${id}`, patch),
  remove: (id: string) => api.del(`/slots/${id}`),
};