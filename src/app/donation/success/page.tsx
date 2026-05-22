"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdCheckmarkCircle, IoMdHome } from "react-icons/io";
import { RiFileCopyLine } from "react-icons/ri";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslationContext();
  const trxID = searchParams.get("trxID") || "N/A";

  const handleCopyTrx = () => {
    navigator.clipboard.writeText(trxID);
    toast.success("Transaction ID copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100/50 p-8 text-center space-y-8 transition-all hover:shadow-emerald-100/20">
        
        {/* Animated Check Icon */}
        <div className="relative mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
          <IoMdCheckmarkCircle size={64} className="text-emerald-500 z-10 animate-scale-up" />
        </div>

        {/* Localized Messages */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("payment_success")}
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            {t("payment_success_desc")}
          </p>
          <p className="text-xs md:text-sm text-emerald-600 bg-emerald-50/50 py-1.5 px-4 rounded-full inline-block font-bold">
            {t("thank_you_donation")}
          </p>
        </div>

        {/* Transaction Details Box */}
        {trxID !== "N/A" && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {t("transaction_id")}
            </span>
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
              <span className="font-mono text-xs md:text-sm font-bold text-slate-700 select-all truncate pr-2">
                {trxID}
              </span>
              <button
                onClick={handleCopyTrx}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition active:scale-95 flex-shrink-0"
                title="Copy Transaction ID"
              >
                <RiFileCopyLine size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-13 rounded-2xl text-base font-bold shadow-lg shadow-teal-100 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <IoMdHome className="text-lg" />
            {t("go_to_home")}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
