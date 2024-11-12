import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Chart from "./components/layouts/graph/Chart.tsx";
import Content from "./components/layouts/content/Content.tsx";
import LoginComponent from "./components/layouts/auth/LoginComponent.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/coinrank" element={<Layout />}>
      <Route path="content" element={<Content />} />,
      <Route path="chart/:symbol" element={<Chart />} loader />,
      <Route path="login" element={<LoginComponent />} />,
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
