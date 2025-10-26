"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setTokenCookie } from "@/src/redux/server/storeCookies";
import { login } from "@/src/redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [loginRequest, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const res = await toast.promise(loginRequest(data).unwrap(), {
        loading: "Logging in...",
        success: "Login Successful!",
        error: "Login failed. Please check your credentials.",
      });
      console.log("login data", res);
      dispatch(
        login({
          username: res?.result.name,
          token: res?.result.accessToken,
          role:res?.result.role
        })
      );

      if (res?.result.accessToken) {
        await setTokenCookie(res?.result.accessToken);
      }

      router.push("/");
    } catch (error) {
      console.log("Login Fail", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-xl shadow-lg w-full max-w-md border border-emerald-300">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Masjid Login
        </h2>
        <FormProviderWrapper<LoginFormData> onSubmit={handleSubmit}>
          <div className="space-y-4">
            <RHFInput
              label="Email"
              name="email"
              placeholder="Enter Email Address"
              type="email"
              rules={{
                required: "Email address is required!",
              }}
            />

            <RHFInput
              name="password"
              label="Password"
              placeholder="Enter Password"
              type="password"
              rules={{
                required: "Password is required!",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold shadow-md disabled:opacity-50 transition-all"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/*  API Error */}
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {typeof error === "string"
                  ? error
                  : "Login failed. Please check your credentials."}
              </p>
            )}
          </div>
        </FormProviderWrapper>

        <p className="text-center text-sm text-gray-700 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-emerald-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
