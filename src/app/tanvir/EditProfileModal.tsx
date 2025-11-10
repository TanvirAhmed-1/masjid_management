"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogHeader } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFSelect from "@/src/components/shared/RHFSelect";
import { FaEdit } from "react-icons/fa";

type TProfile = {
  image?: FileList;
  name: string;
  phone: string;
  gender: string;
  address: string;
  email: string;
};

export default function ProfileEditModal() {
  const HandleSubmit = (data: TProfile) => {
    console.log(data);
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

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<TProfile>
          defaultValues={{ name: "", phone: "", gender: "", address: "", email: "" }}
          onSubmit={HandleSubmit}
        >
          <div className="flex flex-col gap-6 mt-6 max-h-[80vh] overflow-auto">
            <div className="flex  items-center  gap-8">
              <img
                src="/no-profile.png"
                className="w-20 h-20 rounded-full border object-cover shadow-md"
                alt="Profile Preview"
              />
              <RHFInput name="image" type="file" label="Upload Profile" />
            </div>

            <div className="grid grid-cols-1  gap-4">
              <RHFInput name="name" label="Name" placeholder="Enter your name" />
              <RHFInput name="phone" label="Phone" placeholder="Enter your phone number" />
              <RHFSelect
                name="gender"
                label="Gender"
                placeholder="Select your gender"
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
              <RHFInput name="address" label="Address" placeholder="Enter your address" />
              <RHFInput name="email" label="Email" placeholder="Enter your email" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <DialogTrigger asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}
