"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi"; // তোমার authApi path
import { setCredentials } from "@/src/redux/features/auth/authSlice";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  category: string;
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await registerUser(data).unwrap();

      // Redux এ user ডেটা সেভ করো
      dispatch(
        setCredentials({
          username: res.username || data.email,
          token: res.token || null,
          category: data.category,
        })
      );

      console.log("Registered successfully:", res);
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/register2.jpg')] bg-cover bg-center">
      <div className="bg-[#FFF5F2] backdrop-blur-xl p-8 rounded-xl shadow-lg w-full max-w-md border border-emerald-300">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Masjid Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">
              Full Name
            </label>
            <input
              placeholder="Enter Full Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full rounded-lg border border-emerald-300 placeholder:text-black/55 placeholder:text-sm bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">
              Email
            </label>
            <input
              placeholder="Enter Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 block w-full rounded-lg border placeholder:text-black/55 placeholder:text-sm border-emerald-300 bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">
              Password
            </label>
            <input
              placeholder="Enter Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="mt-1 block w-full rounded-lg border border-emerald-300 placeholder:text-black/55 placeholder:text-sm bg-gray-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* User Category */}
          <div>
            <label className="block text-sm font-medium text-emerald-900">
              User Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full rounded-lg border border-emerald-300 bg-gray-50 text-sm text-black/55  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Category</option>
              <option value="people">People</option>
              <option value="member">Member</option>
              <option value="other">Other</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* API Error */}
          {error && (
            <p className="text-red-500 text-sm mt-2">
              {typeof error === "string"
                ? error
                : "Registration failed. Please try again."}
            </p>
          )}
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-teal-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
