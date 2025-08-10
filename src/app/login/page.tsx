"use client";

import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/login.jpg')] bg-cover backdrop-blur-xl bg-center">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-xl shadow-lg w-full max-w-md border border-emerald-300">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">Masjid Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full rounded-lg border border-emerald-300 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full rounded-lg border border-emerald-300 bg-white/70 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-100 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-300 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}
