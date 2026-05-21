"use client";

import { useState } from "react";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import { useCreateMosqueMutation } from "@/src/redux/features/mosqueManagement/mosqueApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaMosque, FaUserShield, FaArrowRight, FaArrowLeft, FaCheck } from "react-icons/fa";
import { LanguageToggle } from "@/src/components/shared/LanguageToggle";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type MosqueCreateFormData = {
  mosque: {
    name: string;
    address: string;
    phone?: string;
  };
  admin: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address?: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone?: string;
  };
};

export default function RegisterPage() {
  const router = useRouter();
  const [createMosque, { isLoading }] = useCreateMosqueMutation();
  const [step, setStep] = useState<1 | 2>(1);
  const { t } = useTranslationContext();

  const steps = [
    { id: 1, name: t("mosque_info"), icon: FaMosque },
    { id: 2, name: t("admin_info"), icon: FaUserShield },
  ];

  const handleNext = async (trigger: any) => {
    const isMosqueValid = await trigger([
      "mosque.name",
      "mosque.address",
      "mosque.phone"
    ]);
    if (isMosqueValid) {
      setStep(2);
    } else {
      toast.error("Please fill in all required Mosque Information");
    }
  };

  const handleSubmit = async (data: MosqueCreateFormData) => {
    if (data.admin.password !== data.admin.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      mosque: {
        name: data.mosque.name,
        address: data.mosque.address,
        phone: data.mosque.phone || "",
      },
      admin: {
        name: data.admin.name,
        email: data.admin.email,
        password: data.admin.password,
        confirmPassword: data.admin.confirmPassword,
        address: data.admin.address || "",
        gender: data.admin.gender,
        phone: data.admin.phone || "",
      },
    };

    try {
      await toast.promise(createMosque(payload).unwrap(), {
        loading: "Registering mosque and admin...",
        success: "Registration Successful! Please login.",
        error: "Registration failed. Please check your credentials.",
      });

      router.push("/login");
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(err?.data?.message || "Registration failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/register2.jpg')] bg-cover bg-center py-12 px-4 relative">
      {/* Top right language toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      {/* Dark overlay for readability and contrast */}
      <div className="absolute inset-0 bg-emerald-950/45 backdrop-blur-[2px] z-0"></div>

      <div className="relative z-10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(4,120,87,0.3)] w-full max-w-2xl border border-emerald-100/50 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-emerald-800 mb-2 tracking-tight">
          {t("register_title")}
        </h2>
        <p className="text-center text-sm text-emerald-950 font-medium mb-8">
          {t("register_subtitle")}
        </p>

        {/* Beautiful step progress indicators */}
        <div className="flex items-center justify-between mb-8 relative px-8">
          {/* Horizontal connecting line */}
          <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-250/70 z-0">
            <div 
              className="h-full bg-emerald-600 transition-all duration-500 rounded-full" 
              style={{ width: step === 1 ? "0%" : "100%" }}
            />
          </div>
          
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  isCompleted 
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-250" 
                    : isActive 
                      ? "bg-white border-emerald-600 text-emerald-600 shadow-lg shadow-emerald-100 scale-110" 
                      : "bg-white border-gray-300 text-gray-450"
                }`}>
                  {isCompleted ? <FaCheck className="text-sm" /> : <Icon className="text-lg" />}
                </div>
                <span className={`text-xs font-semibold mt-2 transition-colors duration-300 ${
                  isActive || isCompleted ? "text-emerald-700 font-bold" : "text-gray-400"
                }`}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>

        <FormProviderWrapper<MosqueCreateFormData> onSubmit={handleSubmit}>
          {(methods) => (
            <div className="space-y-6">
              
              {/* Step 1: Mosque Info Section */}
              <div className={`space-y-6 transition-all duration-500 ${step === 1 ? "block opacity-100 translate-x-0" : "hidden"}`}>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 mb-2">
                  <h3 className="flex items-center gap-2 font-bold text-emerald-800 text-lg">
                    <FaMosque className="text-emerald-600 text-xl" />
                    {t("mosque_info")}
                  </h3>
                  <p className="text-xs text-emerald-700 mt-1">{t("mosque_info_desc")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <RHFInput
                    label={t("mosque_name_label")}
                    name="mosque.name"
                    placeholder="e.g. Central Mosque"
                    rules={{ required: "Mosque name is required" }}
                  />
                  <RHFInput
                    label={t("mosque_phone_label")}
                    name="mosque.phone"
                    placeholder="e.g. 01712345678"
                  />
                  <div className="md:col-span-2">
                    <RHFInput
                      label={t("mosque_address_label")}
                      name="mosque.address"
                      placeholder="e.g. 123 Main Street, Dhaka"
                      rules={{ required: "Address is required" }}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleNext(methods.trigger)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-bold shadow-md transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {t("next_step")}
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Step 2: Admin Info Section */}
              <div className={`space-y-6 transition-all duration-500 ${step === 2 ? "block opacity-100 translate-x-0" : "hidden"}`}>
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50 mb-2">
                  <h3 className="flex items-center gap-2 font-bold text-emerald-800 text-lg">
                    <FaUserShield className="text-emerald-600 text-xl" />
                    {t("admin_info")}
                  </h3>
                  <p className="text-xs text-emerald-700 mt-1">{t("admin_info_desc")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <RHFInput
                    label={t("admin_name_label")}
                    name="admin.name"
                    placeholder="Enter admin name"
                    rules={{ required: "Admin name is required" }}
                  />
                  <RHFInput
                    label={t("admin_email_label")}
                    name="admin.email"
                    type="email"
                    placeholder="Enter admin email"
                    rules={{ required: "Email is required" }}
                  />
                  <RHFInput
                    label={t("admin_password_label")}
                    name="admin.password"
                    placeholder="Enter password"
                    type="password"
                    rules={{ required: "Password is required" }}
                  />
                  <RHFInput
                    label={t("admin_confirm_password_label")}
                    name="admin.confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    rules={{ required: "Confirm password is required" }}
                  />
                  <RHFInput
                    label={t("admin_address_label")}
                    name="admin.address"
                    placeholder="Enter admin address"
                  />
                  <RHFSelect
                    label={t("admin_gender_label")}
                    name="admin.gender"
                    placeholder="Select Gender"
                    options={[
                      { label: "Male", value: "MALE" },
                      { label: "Female", value: "FEMALE" },
                      { label: "Other", value: "OTHER" },
                    ]}
                    rules={{ required: "Gender is required" }}
                  />
                  <div className="md:col-span-2">
                    <RHFInput
                      label={t("admin_phone_label")}
                      name="admin.phone"
                      placeholder="e.g. 01898765432"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-gray-300 hover:border-emerald-500 text-gray-700 hover:text-emerald-700 py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer bg-white"
                  >
                    <FaArrowLeft className="text-xs" />
                    {t("back")}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-bold shadow-md disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {isLoading ? t("registering") : t("register_button")}
                    {!isLoading && <FaArrowRight className="text-xs" />}
                  </button>
                </div>
              </div>

            </div>
          )}
        </FormProviderWrapper>

        <p className="text-center text-sm text-emerald-900 mt-8 font-medium">
          {t("already_account")}{" "}
          <Link
            href="/login"
            className="text-emerald-700 hover:text-emerald-800 underline font-bold transition-colors ml-1"
          >
            {t("login_here")}
          </Link>
        </p>
      </div>
    </div>
  );
}
