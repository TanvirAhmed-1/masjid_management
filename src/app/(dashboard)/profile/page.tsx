"use client";

import {
  useGetMosqueQuery,
  useUpdateMosqueMutation,
} from "@/src/redux/features/mosque/mosqueApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  RiMapPinLine,
  RiPhoneLine,
  RiSave3Line,
  RiEditLine,
  RiLoader4Line,
  RiBuilding2Line,
  RiInformationLine,
  RiCloseLine,
} from "react-icons/ri";

export default function ProfilePage() {
  const { data: mosqueData, isLoading: isFetching } =
    useGetMosqueQuery(undefined);
  const [updateMosque, { isLoading: isUpdating }] = useUpdateMosqueMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "" });

  useEffect(() => {
    if (mosqueData?.result) {
      setFormData({
        name: mosqueData.result.name,
        address: mosqueData.result.address,
      });
    }
  }, [mosqueData]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMosque(formData).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (isFetching) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <RiLoader4Line className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  const result = mosqueData?.result;

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      {/* Profile Header Card */}
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Decorative Background */}
        <div className="h-32 w-full bg-gradient-to-r from-emerald-500 to-teal-600 md:h-40" />

        <div className="px-6 pb-6 md:px-10">
          <div className="relative -mt-12 flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-emerald-100 text-emerald-600 shadow-md md:h-32 md:w-32">
              <RiBuilding2Line size={48} className="md:size-14" />
            </div>

            {/* Edit/Cancel Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex mt-6 items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 shadow-lg shadow-slate-200"
              >
                <RiEditLine size={18} /> Edit Mosque Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-100"
              >
                <RiCloseLine size={18} /> Cancel Editing
              </button>
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
              {result?.name}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <RiMapPinLine className="text-emerald-500" /> {result?.address}
              </span>
              <span className="flex items-center gap-1.5">
                <RiPhoneLine className="text-emerald-500" /> {result?.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
              <RiInformationLine size={20} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-800">
                Basic Information
              </h3>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Official Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-emerald-500/20 outline-none ${
                    isEditing
                      ? "border-emerald-200 bg-white focus:border-emerald-500"
                      : "border-slate-100 bg-slate-50/50 text-slate-600"
                  }`}
                  placeholder="e.g. Central Mosque"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Detailed Address
                </label>
                <textarea
                  disabled={!isEditing}
                  rows={4}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:ring-2 focus:ring-emerald-500/20 outline-none ${
                    isEditing
                      ? "border-emerald-200 bg-white focus:border-emerald-500"
                      : "border-slate-100 bg-slate-50/50 text-slate-600"
                  }`}
                  placeholder="Street name, City, Postcode"
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-100 transition hover:bg-emerald-700 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isUpdating ? (
                    <RiLoader4Line className="animate-spin" size={20} />
                  ) : (
                    <RiSave3Line size={20} />
                  )}
                  Save All Changes
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Right Column: Meta Info */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-emerald-900 p-6 text-white shadow-lg">
   
            <div className="mt-6 border-t border-emerald-800 pt-4">
              <h4 className="text-sm font-medium opacity-80 uppercase tracking-wider">
                Registered On
              </h4>
              <p className="mt-1 font-semibold">
                {result?.createdAt
                  ? new Date(result.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-slate-300 p-6">
            <p className="text-xs leading-relaxed text-slate-400">
              Need to change your registered phone number or unique ID? Please
              contact our support team for verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
