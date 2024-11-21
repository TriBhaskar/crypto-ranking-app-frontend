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

const API_URL = "http://localhost:8081/coinRank/api/v1/user";

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
