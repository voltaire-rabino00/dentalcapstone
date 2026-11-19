import axiosInstance from "./axiosInstance";

// 
interface LoginCredentials {
  email: string;
  password?: string;
  qrToken?: string;
}

export const staffAuth = {
  loginWithPassword: async (credentials: LoginCredentials) => {
    return await axiosInstance.post("/auth/login", credentials);
  },
  verifyQRCode: async (qrToken: string) => {
    
    return await axiosInstance.post("/auth/staff/verify-qr", { qrToken });
  }
};