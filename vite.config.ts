import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react(), mkcert()],
  // server: {
  //   port: 443,
  //   host: "0.0.0.0",
  //   https: {
  //     key: "../.cert/localhost-key.pem",
  //     cert: "../.cert/localhost.pem",
  //   },
  //   // hmr: {
  //   //   host: 'tg-mini-app.local',
  //   //   port: 443,
  //   // },
  // },
});
