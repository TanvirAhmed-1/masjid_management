"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/src/components/ui/dialog";
import RHFInput from "@/src/components/shared/RHFInput";
import RHFTextarea from "@/src/components/shared/RHFTextarea";
import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import toast from "react-hot-toast";
import LoadingButton from "@/src/components/shared/LoadingButton";
import { useAddAccessoryPurchaseMutation } from "@/src/redux/features/monthly-salary/accessoryPurchase/accessoryPurchaseApi";

type AccessoryForm = {
  itemName: string;
  quantity: number;
  price: number;
  totalPrice: number;
  memberName: string;
  description: string;
};

function CreateAccessoryModal() {
  const [open, setOpen] = useState(false);
  const [addPurchase, { isLoading }] = useAddAccessoryPurchaseMutation();

  const onSubmit = async (data: AccessoryForm) => {
    try {
      // Convert string values from form to numbers
      const payload = {
        ...data,
        quantity: Number(data.quantity),
        price: Number(data.price),
        totalPrice: Number(data.quantity) * Number(data.price),
      };

      const result = await addPurchase(payload).unwrap();
      toast.success(result.message || "Purchase recorded successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add record");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-teal-600 hover:bg-teal-700 text-white gap-2">
          <IoMdAdd size={18} /> Add New Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-teal-700">
            Record Accessory Purchase
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<AccessoryForm> onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <RHFInput
              label="Item Name"
              name="itemName"
              placeholder="e.g., Mosque Ceiling Fan"
              rules={{ required: "Item name is required" }}
            />
            <RHFInput
              label="Buyer Name (Optional)"
              name="memberName"
              placeholder="Name of member"
            />
            <RHFInput
              label="Quantity"
              name="quantity"
              type="number"
              placeholder="1"
              rules={{ required: "Required" }}
            />
            <RHFInput
              label="Unit Price (৳)"
              name="price"
              type="number"
              placeholder="0.00"
              rules={{ required: "Required" }}
            />
            <div className="md:col-span-2">
              <RHFTextarea
                label="Description"
                name="description"
                placeholder="Additional details about the purchase..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton isLoading={isLoading} className="bg-teal-600">
              Save Record
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default CreateAccessoryModal;
