"use client";

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
import toast from "react-hot-toast";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "../../shared/RHFSelect";
import LoadingButton from "../../shared/LoadingButton";
import { useCreateMosqueMutation } from "@/src/redux/features/mosque/mosqueApi";
import { FormProviderWrapper } from "../../shared/FormProviderWrapper";
import { FaEdit, FaMosque, FaUserShield } from "react-icons/fa";

type MosqueCreateFormData = {
  mosque: {
    name: string;
    address: string;
    phone?: string;
  };
  admin: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address?: string;
    gender: "MALE" | "FEMALE" | "OTHER";
    phone?: string;
  };
};

type EditMosqueModalProps = {
  mosque: {
    name: string;
    address: string;
    phone?: string;
    users?: {
      name: string;
      email: string;
      phone?: string;
      address?: string;
      gender?: "MALE" | "FEMALE" | "OTHER";
    }[];
  };
};

function EditMosquemodal({ mosque }: EditMosqueModalProps) {
  const [createMosque, { isLoading }] = useCreateMosqueMutation();

  const defaultValues: MosqueCreateFormData = {
    mosque: {
      name: mosque.name,
      address: mosque.address,
      phone: mosque.phone || "",
    },
    admin: {
      name: mosque.users?.[0]?.name || "",
      email: mosque.users?.[0]?.email || "",
      password: "",
      confirmPassword: "",
      address: mosque.users?.[0]?.address || "",
      gender: mosque.users?.[0]?.gender || "MALE",
      phone: mosque.users?.[0]?.phone || "",
    },
  };

  const onSubmit = async (data: MosqueCreateFormData) => {
    if (data.admin.password !== data.admin.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await createMosque(data).unwrap();
      toast.success("Mosque updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update mosque");
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
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Mosque & Admin</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<MosqueCreateFormData>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <div className="space-y-6 mt-4">
            {/* Mosque Info */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                <FaMosque className="text-teal-600 text-lg" />
                Mosque Information
              </h3>
              <div className=" grid mdgrid-cols-3 grid-cols-2 gap-4">
                <RHFInput label="Mosque Name" name="mosque.name" />
                <RHFInput label="Mosque Address" name="mosque.address" />
                <RHFInput label="Mosque Phone" name="mosque.phone" />
              </div>
            </div>

            {/* Admin Info */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                <FaUserShield className="text-purple-600 text-lg" />
                Admin Information
              </h3>
              <div className=" grid mdgrid-cols-3 grid-cols-2 gap-4">
                <RHFInput label="Admin Name" name="admin.name" />
                <RHFInput label="Email" name="admin.email" type="email" />
                <RHFInput
                  label="Password"
                  name="admin.password"
                  type="password"
                />
                <RHFInput
                  label="Confirm Password"
                  name="admin.confirmPassword"
                  type="password"
                />
                <RHFInput label="Admin Address" name="admin.address" />
                <RHFSelect
                  label="Gender"
                  name="admin.gender"
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                    { label: "Other", value: "OTHER" },
                  ]}
                />
                <RHFInput label="Admin Phone" name="admin.phone" />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} loadingText="Update" />
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditMosquemodal;
