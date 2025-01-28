import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": "https://order-service-api-order-service.2.rahtiapp.fi",
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"#root/*": resolve(__dirname),
		},
	},
});
