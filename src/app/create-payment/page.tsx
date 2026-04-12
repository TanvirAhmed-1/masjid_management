"use client";
import React from "react";
import { IoMdHeart, IoMdCheckmarkCircle } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import { useCreatePaymentMutation } from "@/src/redux/features/payment/paymentApi";

const CreatePayment = () => {
  const [createPayment, { isLoading }] = useCreatePaymentMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
      };

      const res = await createPayment(payload).unwrap();

      // bKash পেমেন্ট গেটওয়েতে রিডাইরেক্ট করা
      if (res?.result?.bkashURL) {
        window.location.href = res.result.bkashURL;
      } else {
        toast.error("Could not initiate payment. Try again.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Banner Section */}
        <div className="bg-teal-600 p-8 text-center text-white relative">
          <div className="absolute top-4 right-4 opacity-20">
            <IoMdHeart className="text-6xl" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            Mosque Donation
          </h2>
          <p className="text-teal-100 text-sm mt-2 font-medium">
            আপনার দান পৌঁছে যাবে সঠিক খাতে ইনশাআল্লাহ
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <FormProviderWrapper onSubmit={onSubmit}>
            <div className="space-y-5">
              <RHFInput
                label="Donor Name"
                name="donorName"
                placeholder="Ex: Rahim Ahmed (Optional)"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFInput
                  label="Phone Number"
                  name="donorPhone"
                  placeholder="017XXXXXXXX"
                  rules={{
                    required: "Phone is required",
                    pattern: {
                      value: /^01[3-9]\d{8}$/,
                      message: "Invalid BD number",
                    },
                  }}
                />
                <RHFInput
                  label="Amount (BDT)"
                  name="amount"
                  type="number"
                  placeholder="500"
                  rules={{
                    required: "Amount is required",
                    min: { value: 10, message: "Min amount 10 TK" },
                  }}
                />
              </div>

              <RHFSelect
                label="Donation Purpose"
                name="purpose"
                rules={{ required: "Purpose is required" }}
                options={[
                  { value: "GENERAL", label: "General Donation" },
                  { value: "ZAKAT", label: "Zakat (যাকাত)" },
                  { value: "SADAQAH", label: "Sadaqah (সাদাকাহ)" },
                  { value: "CONSTRUCTION", label: "Mosque Construction" },
                  { value: "MONTHLY_AMOUNT", label: "Monthly Amount" },
                ]}
              />

              <RHFInput
                label="Note / Description"
                name="donorDescription"
                placeholder="Anything you want to share..."
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white h-14 rounded-xl text-lg font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <IoMdCheckmarkCircle className="text-xl" />
                      Pay with bKash
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest font-bold">
                  Secure Payment Powered by bKash
                </p>
              </div>
            </div>
          </FormProviderWrapper>
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
