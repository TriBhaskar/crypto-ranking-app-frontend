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
import LoginComponent from "./components/layouts/auth/login/LoginComponent.tsx";
import RegisterComponent from "./components/layouts/auth/register/RegisterComponent.tsx";
import Home from "./components/layouts/home/Home.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="coins" element={<Content />} />
      <Route path="chart/:symbol" element={<Chart />} />
      <Route path="content" element={<Content />} />
      <Route path="login" element={<LoginComponent />} />
      <Route path="register" element={<RegisterComponent />} />
      {/* <Route path="profile" element={<UserProfile />} /> */}
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
