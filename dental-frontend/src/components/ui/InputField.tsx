import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-semibold text-slate-700 ml-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                   transition-all duration-200 placeholder:text-slate-400 text-slate-900
                   disabled:bg-slate-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};