"use client";

import React from "react";
import {
  IoMdSave,
  IoMdWallet,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import {
  RiInformationLine,
  RiEyeLine,
  RiEyeOffLine,
  RiShieldFlashLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import {
  useGetPaymentCredentialsQuery,
  useSaveBkashCredentialsMutation,
  useDeleteBkashCredentialsMutation,
} from "@/src/redux/features/payment/paymentApi";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

const BkashCredentialsPage = () => {
  const [showSecrets, setShowSecrets] = React.useState(false);
  const { t } = useTranslationContext();
  const [saveCredentials, { isLoading }] = useSaveBkashCredentialsMutation();
  const [deleteCredentials, { isLoading: isDeleting }] = useDeleteBkashCredentialsMutation();
  const { data: paymentCredentials, isFetching } = useGetPaymentCredentialsQuery(undefined);

  const bkashData = paymentCredentials?.result;

  const handleShareLink = () => {
    if (!bkashData?.mosqueId) {
      toast.error(t("failed_to_update_credentials"));
      return;
    }
    const shareUrl = `${window.location.origin}/online-payment?mosqueId=${bkashData.mosqueId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success(t("payment_url_copied"));
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete these credentials?")) return;
    try {
      await deleteCredentials(undefined).unwrap();
      toast.success(t("deleted_successfully"));
    } catch (error: any) {
      toast.error(error?.data?.message || t("failed_to_delete"));
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        isLive: data.isLive === "true",
      };

      const res = await saveCredentials(payload).unwrap();
      toast.success(res.message || t("bkash_settings_updated"));
    } catch (error: any) {
      toast.error(error?.data?.message || t("failed_to_update_credentials"));
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      {/* Decorative Header Banner */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-32 w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 md:h-40 flex items-center justify-between px-6 md:px-10 text-white">
          <div className="z-10 flex items-center justify-between flex-wrap gap-6 w-full ">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl flex items-center gap-3">
                <IoMdWallet className="text-3xl animate-pulse" />
                {t("bkash_merchant_settings")}
              </h1>
              <p className="mt-1.5 text-xs md:text-sm text-pink-100 max-w-md">
                {t("sensitive_data_warning")}
              </p>
            </div>
            <div>
              <Button
                onClick={handleShareLink}
                className="bg-white hover:bg-pink-50 text-pink-600 font-bold border-none rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-pink-900/10"
              >
                {t("share_bkash_payment_url")}
              </Button>
            </div>
          </div>
          {/* Subtle floating background icon */}
          <RiShieldFlashLine className="absolute right-6 md:right-10 text-8xl md:text-9xl text-white/10 pointer-events-none transform rotate-12" />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* ================= LEFT COLUMN: FORM (3/5 width) ================= */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <RiInformationLine size={20} className="text-pink-600" />
              <h3 className="font-semibold text-slate-800 text-lg">
                {t("bkash_merchant_settings")}
              </h3>
            </div>

            <FormProviderWrapper
              onSubmit={onSubmit}
              defaultValues={{
                appKey: bkashData?.appKey || "",
                appSecret: bkashData?.appSecret || "",
                username: bkashData?.username || "",
                password: bkashData?.password || "",
                isLive: String(bkashData?.isLive ?? "false"),
              }}
            >
              <div className="space-y-6">
                <RHFInput
                  label={t("app_key")}
                  name="appKey"
                  placeholder="Enter bKash App Key"
                  rules={{ required: t("app_key") + " is required" }}
                />

                <RHFInput
                  label={t("app_secret")}
                  name="appSecret"
                  type="password"
                  placeholder="Enter bKash App Secret"
                  rules={{ required: t("app_secret") + " is required" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RHFInput
                    label={t("username")}
                    name="username"
                    placeholder="Enter Username"
                    rules={{ required: t("username") + " is required" }}
                  />
                  <RHFInput
                    label={t("password")}
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    rules={{ required: t("password") + " is required" }}
                  />
                </div>

                <RHFSelect
                  label={t("environment")}
                  name="isLive"
                  options={[
                    { value: "false", label: t("sandbox") },
                    { value: "true", label: t("live") },
                  ]}
                />

                {/* Warning Alert Box */}
                <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl flex gap-3 text-xs md:text-sm text-amber-800 shadow-sm">
                  <IoMdInformationCircleOutline className="text-xl shrink-0 text-amber-600" />
                  <p className="leading-relaxed font-medium">
                    {t("sensitive_data_warning")}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-pink-100 transition hover:bg-pink-700 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("saving")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <IoMdSave size={18} />
                      {t("save")}
                    </span>
                  )}
                </Button>
              </div>
            </FormProviderWrapper>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PREVIEW & CREDENTIAL STATUS (2/5 width) ================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Header WITH show/hide toggle */}
            <div className="bg-pink-600 text-white p-5 flex justify-between items-center shadow-inner">
              <h2 className="font-bold tracking-wide flex items-center gap-2">
                <RiShieldFlashLine />
                {t("bkash_credentials")}
              </h2>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSecrets(!showSecrets)}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition"
                >
                  {showSecrets ? <RiEyeOffLine size={14} /> : <RiEyeLine size={14} />}
                  {showSecrets ? t("hide") : t("show")}
                </button>

                {bkashData && (
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-xs bg-rose-750 hover:bg-rose-850 p-2 rounded-lg flex items-center justify-center font-semibold transition text-white border border-rose-500/20 active:scale-95"
                    title={t("delete_credentials")}
                  >
                    <RiDeleteBin6Line size={14} className={isDeleting ? "animate-spin" : ""} />
                  </button>
                )}
              </div>
            </div>

            {/* Content Display */}
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-500">{t("environment")}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full font-bold shadow-sm ${bkashData?.isLive
                  ? "bg-rose-100 text-rose-700 border border-rose-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
                  }`}>
                  {bkashData?.isLive ? t("live") : t("sandbox")}
                </span>
              </div>

              {[
                { label: t("username"), value: bkashData?.username },
                { label: t("password"), value: bkashData?.password },
                { label: t("app_key"), value: bkashData?.appKey },
                { label: t("app_secret"), value: bkashData?.appSecret },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <div className="bg-slate-50 p-3 rounded-2xl font-mono text-xs md:text-sm border border-slate-100 text-slate-700 flex justify-between items-center shadow-inner relative overflow-hidden group">
                    <span className="truncate pr-4">
                      {isFetching
                        ? "Loading..."
                        : item.value
                          ? showSecrets
                            ? item.value
                            : "••••••••••••••••"
                          : t("not_available")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines info card */}
          <div className="rounded-3xl border border-dashed border-slate-300 p-6 bg-slate-50/50">
            <p className="text-xs leading-relaxed text-slate-400">
              Only authorized administrators have access to view and update bKash Merchant Credentials. Please ensure these keys are kept confidential and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashCredentialsPage;
