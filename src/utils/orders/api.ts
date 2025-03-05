import { useAuthStore } from "@/stores/auth";
import axios from "axios";

export const API = axios.create({
	baseURL: "https://order-service-api-order-service.2.rahtiapp.fi/api",
	timeout: 3000,
});

API.interceptors.request.use((config) => {
	const { token } = useAuthStore.getState();
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});
