import axios from "axios";

export const API = axios.create({
	baseURL: "/api",
	timeout: 3000,
});
