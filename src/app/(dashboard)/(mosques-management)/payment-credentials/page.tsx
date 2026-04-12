"use client";
import React from "react";
import {
  IoMdSave,
  IoMdWallet,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";

import toast from "react-hot-toast";
import { useSaveBkashCredentialsMutation } from "@/src/redux/features/payment/paymentApi";

const BkashCredentialsPage = () => {
  const [saveCredentials, { isLoading }] = useSaveBkashCredentialsMutation();

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        isLive: data.isLive === "true", // Select থেকে string আসে, তাই boolean এ কনভার্ট করা হয়েছে
      };

      const res = await saveCredentials(payload).unwrap();
      toast.success(res.message || "bKash settings updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update credentials");
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="max-w-xl w-full">
        {/* Header Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <IoMdWallet className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              bKash Merchant Settings
            </h1>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              মসজিদের অনলাইন ডোনেশন গ্রহণের জন্য আপনার bKash মার্চেন্ট API
              ক্রেডেনশিয়াল সেটআপ করুন।
            </p>
          </div>

          {/* Form Section */}
          <FormProviderWrapper onSubmit={onSubmit}>
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <RHFInput
                  label="App Key"
                  name="appKey"
                  placeholder="Enter your bKash App Key"
                  rules={{ required: "App Key is required" }}
                />

                <RHFInput
                  label="App Secret"
                  name="appSecret"
                  type="password"
                  placeholder="Enter your bKash App Secret"
                  rules={{ required: "App Secret is required" }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RHFInput
                    label="Username"
                    name="username"
                    placeholder="API Username"
                    rules={{ required: "Username is required" }}
                  />
                  <RHFInput
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="API Password"
                    rules={{ required: "Password is required" }}
                  />
                </div>

                <RHFSelect
                  label="Payment Environment"
                  name="isLive"
                  rules={{ required: "Environment selection is required" }}
                  options={[
                    { value: "false", label: "Sandbox (For Testing)" },
                    { value: "true", label: "Live (For Production)" },
                  ]}
                />
              </div>

              {/* Info Note */}
              <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex gap-3 items-start">
                <IoMdInformationCircleOutline className="text-amber-600 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-amber-800 leading-relaxed">
                  সতর্কতা: এই তথ্যগুলো অত্যন্ত সংবেদনশীল। ভুল তথ্য দিলে পেমেন্ট
                  গেটওয়ে কাজ করবে না। লাইভ মুডে যাওয়ার আগে অবশ্যই স্যান্ডবক্সে
                  টেস্ট করে নিন।
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white h-12 text-base font-semibold transition-all shadow-md active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <IoMdSave className="text-xl" />
                    Save Configuration
                  </span>
                )}
              </Button>
            </div>
          </FormProviderWrapper>
        </div>

        {/* Footer Support Info */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Need help with API keys? Contact bKash Merchant Support.
        </p>
      </div>
    </div>
  );
};

export default BkashCredentialsPage;
