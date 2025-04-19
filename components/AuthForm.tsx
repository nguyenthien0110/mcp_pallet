"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function AuthForm() {
  const [client, setClient] = useState("");
  const [key, setKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const validateInputs = () => {
    if (!client.trim() || !key.trim()) {
      setError("Client and Key are required.");
      return false;
    }

    if (key.length < 6) {
      setError("Key must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    const success = await login(client, key);
    if (!success) {
      setError("Invalid client or key.");
    } else {
      setError("");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border rounded-xl p-8 shadow-md w-80">
        <h2 className="text-center text-2xl font-semibold mb-6">Welcome</h2>

        <input
          placeholder="Enter client name or ID"
          className="w-full p-2 border rounded mb-4"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            placeholder="Enter authentication key"
            type={showPassword ? "text" : "password"}
            className="w-full p-2 border rounded pr-10"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-sm text-blue-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <button
          className="w-full py-2 border rounded hover:bg-gray-100"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}
