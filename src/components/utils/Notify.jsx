"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Style riêng cho từng trạng thái
const toastStyles = {
  success: {
    style: {
      background: "linear-gradient(135deg, #43cea2, #185a9d)",
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
  },
  error: {
    style: {
      background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
  },
  info: {
    style: {
      background: "linear-gradient(135deg, #2193b0, #6dd5ed)",
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
  },
  warning: {
    style: {
      background: "linear-gradient(135deg, #f7971e, #ffd200)",
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
  },
};

// Config chung
const defaultConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// API notify để gọi ở bất cứ đâu
export const notify = {
  success: (message) =>
    toast.success(message, { ...defaultConfig, ...toastStyles.success }),
  error: (message) =>
    toast.error(message, { ...defaultConfig, ...toastStyles.error }),
  info: (message) =>
    toast.info(message, { ...defaultConfig, ...toastStyles.info }),
  warning: (message) =>
    toast.warning(message, { ...defaultConfig, ...toastStyles.warning }),
};

// Component Provider
export default function NotifyProvider() {
  return (
    <ToastContainer
      newestOnTop={true}
      containerStyle={{ marginTop: "70px" }}
      toastClassName="animate__animated animate__fadeInDown"
    />
  );
}
