"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import { IoMdCloseCircle, IoMdHome } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

const FailContent = () => {
  const router = useRouter();
  const { t } = useTranslationContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100/50 p-8 text-center space-y-8 transition-all hover:shadow-rose-100/20">
        
        {/* Animated Fail Icon */}
        <div className="relative mx-auto w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-100 rounded-full animate-ping opacity-25"></div>
          <IoMdCloseCircle size={64} className="text-rose-500 z-10 animate-scale-up" />
        </div>

        {/* Localized Messages */}
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("payment_fail")}
          </h1>
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            {t("payment_fail_desc")}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button
            onClick={() => router.push("/")}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white h-13 rounded-2xl text-base font-bold shadow-lg shadow-rose-100 active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <IoMdHome className="text-lg" />
            {t("go_to_home")}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentFailPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <FailContent />
    </Suspense>
  );
};

export default PaymentFailPage;
