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
import RHFSelect from "@/src/components/shared/RHFSelect";
import LoadingButton from "@/src/components/shared/LoadingButton";
import toast from "react-hot-toast";
import { useCreateMosqueMemberMutation } from "@/src/redux/features/mosqueManagement/mosqueMemberApi";

type MemberCreateFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address: string;
  gender: "MALE" | "FEMALE" | "OTHERS";
};

function MemberCreate() {
  const [createMember, { isLoading }] = useCreateMosqueMemberMutation();

  const onSubmit = async (data: MemberCreateFormData) => {
    try {
      // Password match check
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        phone: data.phone || "",
        gender: data.gender,
      };

      const result = await createMember(payload).unwrap();
      toast.success("Member created successfully!");
      console.log(result);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create member");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
          <IoMdAdd />
          Create Member
        </Button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-2xl max-w-xl mx-auto">
        <DialogHeader>
          <DialogTitle>Create Member</DialogTitle>
          <p className="text-sm text-gray-500">Enter member details</p>
        </DialogHeader>

        <FormProviderWrapper<MemberCreateFormData> onSubmit={onSubmit}>
          <div className="space-y-6 mt-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <RHFInput
                label="Name"
                name="name"
                placeholder="Member Name"
                rules={{ required: "Name is required" }}
              />
              <RHFInput
                label="Email"
                name="email"
                type="email"
                placeholder="member@example.com"
                rules={{ required: "Email is required" }}
              />
              <RHFInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                rules={{ required: "Password is required" }}
              />
              <RHFInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                rules={{ required: "Confirm password is required" }}
              />
              <RHFInput label="Phone" name="phone" placeholder="01712345678" />
              <RHFInput
                label="Address"
                name="address"
                placeholder="Enter address"
                rules={{ required: "Address is required" }}
              />
              <RHFSelect
                label="Gender"
                name="gender"
                placeholder="Select Gender"
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                  { label: "Other", value: "OTHERS" },
                ]}
                rules={{ required: "Gender is required" }}
              />
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

export default MemberCreate;
