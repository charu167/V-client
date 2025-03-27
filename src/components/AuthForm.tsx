"use client";

import { useState, JSX } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  title: string;
  fields: { name: string; type: string; placeholder: string }[];
  apiEndpoint: string;
  redirectTo: string;
  defaultValues: Record<string, string>;
  submitButtonText?: string;
  extraBottomText?: JSX.Element;
  includeRole?: boolean;
  roleValue?: string;
}

export default function AuthForm({
  title,
  fields,
  apiEndpoint,
  redirectTo,
  defaultValues,
  submitButtonText = "Submit",
  extraBottomText,
  includeRole = false,
  roleValue = "",
}: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ ...defaultValues });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = includeRole ? { ...formData, role: roleValue } : formData;

      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      // Store tokens if they exist
      if (data.tokens) {
        localStorage.setItem("accessToken", data.tokens.access);
        localStorage.setItem("refreshToken", data.tokens.refresh);
      }

      router.push(redirectTo);
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-purple-700">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-200"
          >
            {loading ? "Processing..." : submitButtonText}
          </button>
        </form>
        {error && (
          <div className="text-center text-sm text-red-600 mt-2">{error}</div>
        )}
        {extraBottomText && (
          <div className="text-center text-sm text-gray-700 mt-4">
            {extraBottomText}
          </div>
        )}
      </div>
    </div>
  );
}
