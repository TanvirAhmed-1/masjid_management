"use client";

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
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import { useUpdateStaffMutation } from "@/src/redux/features/staff/staffApi";
import { IStaff } from "./StaffRow";
import { Edit } from "lucide-react";

type FormData = {
  name: string;
  phone: string;
  role: string;
  status?: string;
  baseSalary: number;
  joinDate: Date | null;
  address: string;
  image?: FileList;
};

type Props = {
  staff: IStaff;
};

function EditStaffModal({ staff }: Props) {
  const [updateStaff, { isLoading }] = useUpdateStaffMutation();
  const [preview, setPreview] = useState<string | null>(staff.image ?? null);

  const defaultValues = {
    name: staff.name,
    phone: staff.phone ?? "",
    role: staff.role,
    baseSalary: staff.baseSalary,
    joinDate: staff.joinDate ? new Date(staff.joinDate) : undefined,
    address: staff.address,
  };

  const onSubmit = async (formData: FormData) => {
    const payload = {
      ...formData,
      joinDate: formData.joinDate
        ? new Date(formData.joinDate).toISOString()
        : undefined,
      baseSalary: Number(formData.baseSalary),
    };

    try {
      const res = await updateStaff({ id: staff.id, data: payload }).unwrap();
      toast.success(res?.message || "Staff updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update staff");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 shadow-sm transition-all duration-200"
          size="sm"
          title="Edit"
        >
          <Edit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Edit Staff Member
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">
            Update staff information and save changes.
          </p>
        </DialogHeader>

        <FormProviderWrapper<FormData>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            {/* Image */}
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Staff Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
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
              {isLoading ? "Updating..." : "Update Staff"}
            </Button>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditStaffModal;
