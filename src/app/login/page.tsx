"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { setTokenCookie } from "@/src/redux/server/storeCookies";
import { login } from "@/src/redux/features/auth/authSlice";
import { toast } from "react-hot-toast";
import RHFInput from "@/src/components/shared/RHFInput";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { FaMosque, FaSignInAlt } from "react-icons/fa";
import { LanguageToggle } from "@/src/components/shared/LanguageToggle";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [loginRequest, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslationContext();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const res = await toast.promise(loginRequest(data).unwrap(), {
        loading: "Logging in...",
        success: "Login Successful!",
        error: "Login failed. Please check your credentials.",
      });
      dispatch(
        login({
          username: res?.result.name,
          token: res?.result.accessToken,
          role: res?.result.role,
        }),
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
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/login.jpg')] bg-cover bg-center py-12 px-4 relative animate-fade-in">
      {/* Top right language toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      {/* Dark overlay for readability and contrast */}
      <div className="absolute inset-0 bg-emerald-950/45 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(4,120,87,0.3)] w-full max-w-md border border-emerald-100/50 transition-all duration-300">
        
        {/* Brand Icon/Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3 border border-emerald-100 shadow-sm text-emerald-600">
            <FaMosque className="text-3xl" />
          </div>
          <h2 className="text-2xl font-extrabold text-center text-emerald-800 tracking-tight">
            {t("login_title")}
          </h2>
          <p className="text-xs text-emerald-900/70 text-center mt-1">
            {t("login_subtitle")}
          </p>
        </div>

        {/* Guest Credentials Shortcut */}
        <div className="flex flex-col items-center mb-6 bg-emerald-50/50 p-4 rounded-xl border border-emerald-150/40">
          <p className="text-xs text-emerald-800 font-semibold mb-2">{t("guest_cta")}</p>
          <button
            type="button"
            onClick={() => {
              handleSubmit({ email: "tanvir@gmail.com", password: "Abc@1234" });
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl font-bold shadow-sm text-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <FaSignInAlt className="text-xs" />
            {t("guest_button")}
          </button>
        </div>

        <FormProviderWrapper<LoginFormData> onSubmit={handleSubmit}>
          <div className="space-y-5">
            <RHFInput
              label={t("email_label")}
              name="email"
              placeholder={t("email_label")}
              type="email"
              rules={{
                required: "Email address is required!",
              }}
            />

            <RHFInput
              name="password"
              label={t("password_label")}
              placeholder={t("password_label")}
              type="password"
              rules={{
                required: "Password is required!",
              }}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-md disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer text-base mt-2"
            >
              {isLoading ? t("registering") : t("login_button")}
            </button>

            {/* API Error */}
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center bg-red-50 py-2 rounded-lg border border-red-100 font-medium">
                {typeof error === "string"
                  ? error
                  : "Login failed. Please check your credentials."}
              </p>
            )}
          </div>
        </FormProviderWrapper>

        {/* Register Link */}
        <p className="text-center text-sm text-emerald-900 mt-8 font-medium">
          {t("no_account")}{" "}
          <Link
            href="/register"
            className="text-emerald-700 hover:text-emerald-800 underline font-bold transition-colors ml-1"
          >
            {t("register_now")}
          </Link>
        </p>

      </div>
    </div>
  );
}
