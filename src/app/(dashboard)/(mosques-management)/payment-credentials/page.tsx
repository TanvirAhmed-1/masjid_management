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
import {
  useGetPaymentCredentialsQuery,
  useSaveBkashCredentialsMutation,
} from "@/src/redux/features/payment/paymentApi";

const BkashCredentialsPage = () => {
  const [showSecrets, setShowSecrets] = React.useState(false);

  const [saveCredentials, { isLoading }] = useSaveBkashCredentialsMutation();

  const { data: paymentCredentials, isFetching } =
    useGetPaymentCredentialsQuery(undefined);

  const bkashData = paymentCredentials?.result;

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        isLive: data.isLive === "true",
      };

      const res = await saveCredentials(payload).unwrap();
      toast.success(res.message || "bKash settings updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= LEFT: FORM ================= */}
        <div className="bg-white p-8 rounded-2xl shadow-md border">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <IoMdWallet className="text-3xl" />
            </div>
            <h1 className="text-2xl font-bold">bKash Merchant Settings</h1>
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
            <div className="space-y-5">
              <RHFInput
                label="App Key"
                name="appKey"
                rules={{ required: "Required" }}
              />

              <RHFInput
                label="App Secret"
                name="appSecret"
                type="password"
                rules={{ required: "Required" }}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <RHFInput
                  label="Username"
                  name="username"
                  rules={{ required: "Required" }}
                />
                <RHFInput
                  label="Password"
                  name="password"
                  type="password"
                  rules={{ required: "Required" }}
                />
              </div>

              <RHFSelect
                label="Environment"
                name="isLive"
                options={[
                  { value: "false", label: "Sandbox" },
                  { value: "true", label: "Live" },
                ]}
              />

              <div className="bg-amber-50 p-3 rounded flex gap-2 text-xs">
                <IoMdInformationCircleOutline />
                Sensitive data — test before going live.
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Save"}
              </Button>
            </div>
          </FormProviderWrapper>
        </div>

        {/* ================= RIGHT: PREVIEW ================= */}
        <div className="bg-white rounded-2xl shadow-md border overflow-hidden">
          {/* Header WITH toggle */}
          <div className="bg-pink-600 text-white p-5 flex justify-between items-center">
            <h2 className="font-bold">bKash Credentials</h2>

            <button
              onClick={() => setShowSecrets(!showSecrets)}
              className="text-xs bg-white/20 px-3 py-1 rounded"
            >
              {showSecrets ? "Hide" : "Show"}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between">
              <span>Environment</span>
              <span>{bkashData?.isLive ? "Live" : "Sandbox"}</span>
            </div>

            {[
              { label: "Username", value: bkashData?.username },
              { label: "Password", value: bkashData?.password },
              { label: "App Key", value: bkashData?.appKey },
              { label: "App Secret", value: bkashData?.appSecret },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs text-gray-400">{item.label}</p>
                <div className="bg-gray-50 p-2 rounded font-mono text-sm border">
                  {isFetching
                    ? "Loading..."
                    : item.value
                      ? showSecrets
                        ? item.value
                        : "••••••••••••"
                      : "Not available"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BkashCredentialsPage;
