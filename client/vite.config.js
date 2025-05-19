import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // ⬅️ ini yang tadi belum ada

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        // Mengizinkan host dari ngrok
        host: true, // agar dev server mendengarkan semua interface
        allowedHosts: ["d966-36-90-7-44.ngrok-free.app"],
    },
});
