"use client";

import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { useCreateStaffMutation } from "@/src/redux/features/staff/staffApi";

type FormData = {
  name: string;
  phone: string;
  role: string;
  baseSalary: number;
  joinDate: string;
  address: string;
  image?: FileList;
};

function CreateStaffModal() {
  const [createStaff, { isLoading }] = useCreateStaffMutation();
  const [preview, setPreview] = useState<string | null>(null); // ✅ image preview

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      joinDate: data.joinDate
        ? new Date(data.joinDate).toISOString()
        : undefined,
      baseSalary: Number(data.baseSalary),
      active: true,
    };

    try {
      const res = await createStaff(payload).unwrap();
      toast.success(res?.message || "Staff created successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create staff");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
          <IoMdAdd className="text-lg" />
          Add New Staff
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Staff Member
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Enter the staff details below to add them to the system.
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {/* Image Input with Preview */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Staff Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md border"
                />
              )}
            </div>

            <RHFInput
              name="name"
              label="Full Name"
              placeholder="Enter full name"
            />

            <RHFInput
              name="phone"
              label="Phone Number"
              placeholder="01XXXXXXXXX"
            />

            <RHFInput
              name="role"
              label="Role / Position"
              placeholder="Enter staff role"
            />

            <RHFInput
              name="baseSalary"
              label="Base Salary (BDT)"
              type="number"
              placeholder="Enter base salary"
            />

            <RHFDatePicker
              name="joinDate"
              label="Joining Date"
              placeholder="Select join date"
            />

            <RHFTextarea
              name="address"
              label="Address"
              placeholder="Enter full address"
            />
          </div>

          <DialogFooter className="mt-8 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[140px] bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Staff"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateStaffModal;
