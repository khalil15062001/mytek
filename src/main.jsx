import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ CSS : dans cet ordre
import "bootstrap/dist/css/bootstrap.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// ✅ JS : jQuery + Bootstrap + AdminLTE
import $ from "jquery";
window.$ = window.jQuery = $;

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "admin-lte/dist/js/adminlte.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
