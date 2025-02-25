import axios from "axios";

export const API = axios.create({
	baseURL: "https://order-service-api-order-service.2.rahtiapp.fi/api",
	timeout: 3000,
});
