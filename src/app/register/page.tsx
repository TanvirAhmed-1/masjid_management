"use client";

import { useDispatch } from "react-redux";
import { useRegisterMutation } from "@/src/redux/features/auth/authApi";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { login } from "@/src/redux/features/auth/authSlice";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormData = {
  name: string;
  email: string;
  password: string;
  address: string;
  gender: string;
};

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await toast.promise(registerUser(data).unwrap(), {
        loading: "Logging in...",
        success: "Login Successful!",
        error: "Login failed. Please check your credentials.",
      });

      dispatch(
        login({
          username: res?.result?.username,
          token: res?.result?.token,
        })
      );

      toast.success("Registration Successful ");

      router.push("/");
    } catch (err: any) {
      console.error(" Register error:", err);
      toast.error(err?.data?.message || "Registration failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/register2.jpg')] bg-cover bg-center">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-emerald-300">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Masjid Register
        </h2>

        <FormProviderWrapper<FormData> onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <RHFInput
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              rules={{ required: "Name is required!" }}
            />

            {/* Email */}
            <RHFInput
              label="Email"
              name="email"
              placeholder="Enter email address"
              type="email"
              rules={{ required: "Email address is required!" }}
            />

            {/* Password */}
            <RHFInput
              label="Password"
              name="password"
              placeholder="Enter password"
              type="password"
              rules={{ required: "Password is required!" }}
            />

            {/* Address */}
            <RHFInput
              label="Address"
              name="address"
              placeholder="Enter address"
              rules={{ required: "Address is required!" }}
            />

            {/* Gender Section */}
            <GenderRadioGroup />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-50 transition-all"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </FormProviderWrapper>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-emerald-600 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

function GenderRadioGroup() {
  const { register } = useFormContext();

  return (
    <div className="form-control">
      <label className="label font-semibold text-gray-700">Gender</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="MALE"
            {...register("gender", { required: "Gender is required" })}
            className="radio radio-emerald-500"
          />
          Male
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="FEMALE"
            {...register("gender", { required: "Gender is required" })}
            className="radio radio-emerald-500"
          />
          Female
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="OTHERS"
            {...register("gender", { required: "Gender is required" })}
            className="radio radio-emerald-500"
          />
          Other
        </label>
      </div>
    </div>
  );
}
