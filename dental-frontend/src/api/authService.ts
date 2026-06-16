import axiosInstance from "./axiosInstance";

// Gumawa tayo ng interface para sa type safety
interface LoginCredentials {
  email: string;
  password?: string;
  qrToken?: string;
}

export const staffAuth = {
  loginWithPassword: async (credentials: LoginCredentials) => {
    return await axiosInstance.post("/auth/staff/login", credentials);
  },
  verifyQRCode: async (qrToken: string) => {
    // Siguraduhing tumutugma ito sa route sa backend mo
    return await axiosInstance.post("/auth/staff/verify-qr", { qrToken });
  }
};