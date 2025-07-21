// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     proxy: {
//       "/restaurants": "http://localhost:4000",
//       "/restaurant": "http://localhost:4000",
//     },
//     historyApiFallback: true, // ✅ this enables SPA routing support
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // ✅ Key line for React Router to work on refresh
  },
});


/*updated vite.config.js*/
//With this, you can also use relative URLs like /restaurants instead of hardcoding http://localhost:4000/restaurants.
//But either method (full URL or proxy) works fine.
