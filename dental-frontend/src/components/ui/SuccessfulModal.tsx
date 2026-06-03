import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  gifUrl: string;
  type?: "success" | "error"; // Dito natin ididifferentiate
}

export const SuccessModal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, gifUrl, type = "success" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
        <img src={gifUrl} alt="Animation" className="w-32 h-32 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 mb-6">{message}</p>
        <button 
          onClick={onClose}
          // Kung error, kulay pula ang button; kung success, teal
          className={`w-full py-3 text-white rounded-xl transition ${type === "error" ? "bg-red-600 hover:bg-red-700" : "bg-teal-600 hover:bg-teal-700"}`}
        >
          {type === "error" ? "Try Again" : "Proceed to Login"}
        </button>
      </div>
    </div>
  );
};