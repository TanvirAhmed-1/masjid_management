"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IoMdHeart, IoMdCheckmarkCircle } from "react-icons/io";
import { RiAlertLine, RiLoader4Line, RiShieldCheckLine } from "react-icons/ri";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import {
  useCreatePaymentMutation,
  useGetPaymentCredentialsQuery,
} from "@/src/redux/features/payment/paymentApi";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

const OnlinePaymentContent = () => {
  const searchParams = useSearchParams();
  const mosqueId = searchParams.get("mosqueId");
  const { t } = useTranslationContext();

  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const { data: credentialsData, isLoading: isInfoLoading } = useGetPaymentCredentialsQuery(
    mosqueId || undefined,
    { skip: !mosqueId }
  );

  const mosqueName = credentialsData?.result?.mosque?.name || "";

  const onSubmit = async (data: any) => {
    if (!mosqueId) {
      toast.error(t("invalid_mosque_url_desc"));
      return;
    }

    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        mosqueId,
      };

      const res = await createPayment(payload).unwrap();

      // Redirect to bKash Payment Gateway
      if (res?.result?.bkashURL) {
        window.location.href = res.result.bkashURL;
      } else {
        toast.error("Could not initiate payment. Try again.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  // 1. Missing or Invalid Mosque ID State
  if (!mosqueId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100 p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
            <RiAlertLine size={32} className="animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">{t("invalid_mosque_url")}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("invalid_mosque_url_desc")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Loading State
  if (isInfoLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <RiLoader4Line size={48} className="animate-spin text-teal-600" />
          <p className="text-sm text-gray-500 font-semibold">{t("creating")}</p>
        </div>
      </div>
    );
  }

  // 3. Main Form State
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg">
        {/* Donation Form Card */}
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl">
          {/* Elegant Top Banner */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-center text-white relative">
            <div className="absolute top-4 right-4 opacity-15">
              <IoMdHeart className="text-7xl animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-wider">
              {t("mosque_donation")}
            </h2>
            {mosqueName && (
              <p className="text-emerald-100 font-semibold mt-1 text-sm bg-black/10 px-3 py-1 rounded-full inline-block backdrop-blur-sm">
                {mosqueName}
              </p>
            )}
            <p className="text-teal-100/90 text-xs mt-3 font-medium">
              {t("donation_desc")}
            </p>
          </div>

          {/* Input Form Fields */}
          <div className="p-8">
            <FormProviderWrapper onSubmit={onSubmit}>
              <div className="space-y-5">
                <RHFInput
                  label={t("donor_name")}
                  name="donorName"
                  placeholder={t("donor_name_placeholder")}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RHFInput
                    label={t("phone_number")}
                    name="donorPhone"
                    placeholder={t("phone_placeholder")}
                    rules={{
                      required: t("phone_required"),
                      pattern: {
                        value: /^01[3-9]\d{8}$/,
                        message: t("invalid_bd_phone"),
                      },
                    }}
                  />
                  <RHFInput
                    label={t("amount_bdt")}
                    name="amount"
                    type="number"
                    placeholder="500"
                    rules={{
                      required: t("amount_required"),
                      min: { value: 10, message: t("min_amount_error") },
                    }}
                  />
                </div>

                <RHFSelect
                  label={t("donation_purpose")}
                  name="purpose"
                  rules={{ required: t("purpose_required") }}
                  options={[
                    { value: "GENERAL", label: t("general_donation") },
                    { value: "ZAKAT", label: t("zakat") },
                    { value: "SADAQAH", label: t("sadaqah") },
                    { value: "CONSTRUCTION", label: t("mosque_construction") },
                    { value: "MONTHLY_AMOUNT", label: t("monthly_amount") },
                  ]}
                />

                <RHFInput
                  label={t("note_description")}
                  name="donorDescription"
                  placeholder={t("note_placeholder")}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white h-14 rounded-2xl text-lg font-bold shadow-xl shadow-pink-100 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t("creating")}
                      </span>
                    ) : (
                      <>
                        <IoMdCheckmarkCircle className="text-xl" />
                        {t("pay_with_bkash")}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <RiShieldCheckLine className="text-xs text-gray-500" />
                    {t("secure_payment_desc")}
                  </div>
                </div>
              </div>
            </FormProviderWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatePayment = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <RiLoader4Line size={48} className="animate-spin text-teal-600" />
          <p className="text-sm text-gray-500 font-semibold">Loading payment portal...</p>
        </div>
      </div>
    }>
      <OnlinePaymentContent />
    </Suspense>
  );
};

export default CreatePayment;
