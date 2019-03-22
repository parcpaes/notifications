import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getNotifications() {
    return apiClient.get("/notificaciones");
  },
  getNotification(id) {
    return apiClient.get(`/notificaciones/${id}`);
  },
  postNotification(note) {
    return apiClient.post("/notificaciones", note);
  },
  putNotification(id, note) {
    return apiClient.put(`/notificaciones/${id}`, note);
  },
  getNotificationsMensajes(idnote) {
    return apiClient.get(`/notificaciones/${idnote}/mensajes`);
  },
  postMessage(message) {
    return apiClient.post("/mensajes", message);
  },
  removeMessage(id) {
    return apiClient.delete(`/mensajes/${id}`);
  }
};
