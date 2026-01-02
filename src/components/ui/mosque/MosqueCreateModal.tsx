"use client";

import { IoMdAdd } from "react-icons/io";
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
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import RHFSelect from "../../shared/RHFSelect";
import LoadingButton from "../../shared/LoadingButton";
import { useCreateMosqueMutation } from "@/src/redux/features/mosque/mosqueApi";
import { FaMosque, FaUserShield } from "react-icons/fa";

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

function MosqueCreate() {
  const [createMosque, { isLoading }] = useCreateMosqueMutation();

  const onSubmit = async (data: MosqueCreateFormData) => {
    try {
      // Optional password match check
      if (data.admin.password !== data.admin.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const payload = {
        mosque: {
          name: data.mosque.name,
          address: data.mosque.address,
          phone: data.mosque.phone || "",
        },
        admin: {
          name: data.admin.name,
          email: data.admin.email,
          password: data.admin.password,
          confirmPassword: data.admin.confirmPassword,
          address: data.admin.address || "",
          gender: data.admin.gender,
          phone: data.admin.phone || "",
        },
      };

      console.log("Submitting payload:", payload);

      const result = await createMosque(payload).unwrap();
      toast.success("Mosque & Admin created successfully!");
      console.log(result);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create mosque and admin");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2">
          <IoMdAdd />
          Create Mosque
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-2xl max-w-xl mx-auto">
        <DialogHeader>
          <DialogTitle>Create Mosque & Admin</DialogTitle>
          <p className="text-sm text-gray-500">
            Enter mosque details and admin information
          </p>
        </DialogHeader>

        <FormProviderWrapper<MosqueCreateFormData> onSubmit={onSubmit}>
          <div className="space-y-6 mt-4">
            {/* Mosque Info */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                <FaMosque className="text-teal-600 text-lg" />
                Mosque Information
              </h3>
              <div className=" grid md:grid-cols-3 gap-4 grid-cols-2">
                <RHFInput
                  label="Mosque Name"
                  name="mosque.name"
                  placeholder="Central Mosque"
                  rules={{ required: "Mosque name is required" }}
                />
                <RHFInput
                  label="Mosque Address"
                  name="mosque.address"
                  placeholder="123 Main Street, Dhaka"
                  rules={{ required: "Address is required" }}
                />
                <RHFInput
                  label="Mosque Phone"
                  name="mosque.phone"
                  placeholder="01712345678"
                />
              </div>
            </div>

            {/* Admin Info */}
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-3 text-gray-800">
                <FaUserShield className="text-purple-600 text-lg" />
                Admin Information
              </h3>

              <div className=" grid mdgrid-cols-3 grid-cols-2 gap-4">
                <RHFInput
                  label="Admin Name"
                  name="admin.name"
                  placeholder="Enter admin name"
                  rules={{ required: "Admin name is required" }}
                />
                <RHFInput
                  label="Email"
                  name="admin.email"
                  type="email"
                  placeholder="Enter admin email"
                  rules={{ required: "Email is required" }}
                />
                <RHFInput
                  label="Password"
                  name="admin.password"
                  placeholder="Enter your password"
                  type="password"
                  rules={{ required: "Password is required" }}
                />
                <RHFInput
                  label="Confirm Password"
                  name="admin.confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  rules={{ required: "Confirm your password" }}
                />
                <RHFInput
                  label="Admin Address"
                  name="admin.address"
                  placeholder="Enter admin address"
                />
                <RHFSelect
                  label="Gender"
                  name="admin.gender"
                  placeholder="Select the Gender"
                  options={[
                    { label: "Male", value: "MALE" },
                    { label: "Female", value: "FEMALE" },
                    { label: "Other", value: "OTHER" },
                  ]}
                  rules={{ required: "Gender is required" }}
                />
                <RHFInput
                  label="Admin Phone"
                  name="admin.phone"
                  placeholder="01898765432"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} loadingText="Creating...">
              Create
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default MosqueCreate;
