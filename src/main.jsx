import './index.css'
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { initCanvasErrorPrevention } from "@/utils/canvasHelpers";

// Initialize canvas error prevention to handle external script issues
initCanvasErrorPrevention();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)