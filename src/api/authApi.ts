// src/api.ts
import axios from "axios";

interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface RegisterResponse {
  status: string;
  message: string;
  username: string;
  timestamp: string;
}

const API_URL = `${import.meta.env.VITE_API_URL}/user`;

export const registerUser = async (
  registerRequest: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/register`,
      registerRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Registration failed");
    } else {
      throw new Error("Registration failed");
    }
  }
};

interface LoginRequest {
  identifier: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  username: string;
  jwt: string;
  timestamp: string;
}

export const loginUser = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      loginRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Login failed");
    }
  }
};

interface ForgotPasswordRequest {
  email: string;
  resetPwdUrl: string;
}

interface ForgotPasswordResponse {
  status: string;
  message: string;
  timestamp: string;
}

export const forgotPassword = async (
  forgotPasswordRequest: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post<ForgotPasswordResponse>(
      `${API_URL}/forgot-password`,
      forgotPasswordRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to send password reset email"
      );
    } else {
      throw new Error("Failed to send password reset email");
    }
  }
};

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ResetPasswordResponse {
  status: string;
  message: string;
  timestamp: string;
}

export const resetPassword = async (
  resetPasswordRequest: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    console.log(resetPasswordRequest);
    const response = await axios.post<ResetPasswordResponse>(
      `${API_URL}/reset-password`,
      resetPasswordRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.message || "Failed to reset password"
      );
    } else {
      throw new Error("Failed to reset password");
    }
  }
};
