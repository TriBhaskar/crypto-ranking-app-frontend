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
import Home from "./components/layouts/home/Home.tsx";
import SignInComponent from "./components/layouts/auth/login/SignInComponent.tsx";
import SignUpComponent from "./components/layouts/auth/register/SignUpComponent.tsx";
import ForgotPassword from "./components/layouts/auth/login/ForgotPassword.tsx";
import ResetPassword from "./components/layouts/auth/login/ResetPassword.tsx";
import VerifyOtp from "./components/layouts/auth/register/VerifyOtp.tsx";
import { ProtectedVerifyRoute } from "./route/ProtectedVerifyRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="coins" element={<Content />} />
      <Route path="chart/:symbol" element={<Chart />} />
      <Route path="content" element={<Content />} />
      <Route path="signin" element={<SignInComponent />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />,
      <Route path="signup">
        <Route index element={<SignUpComponent />} />
        <Route
          path="verify-email"
          element={
            <ProtectedVerifyRoute>
              <VerifyOtp />
            </ProtectedVerifyRoute>
          }
        />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
