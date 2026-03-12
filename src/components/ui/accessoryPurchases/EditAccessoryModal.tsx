"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
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
import { AccessoryType } from "./AccessoryTable";
import { useUpdateAccessoryPurchaseMutation } from "@/src/redux/features/monthly-salary/accessoryPurchase/accessoryPurchaseApi";

type EditAccessoryForm = {
  itemName: string;
  quantity: number;
  price: number;
  memberName?: string;
  description?: string;
};

type Props = {
  accessory: AccessoryType;
};

function EditAccessoryModal({ accessory }: Props) {
  const [open, setOpen] = useState(false);
  const [updatePurchase, { isLoading }] = useUpdateAccessoryPurchaseMutation();

  // Initial values for the form
  const defaultValues = {
    itemName: accessory.itemName,
    quantity: accessory.quantity,
    price: accessory.price,
    memberName: accessory.memberName || "",
    description: accessory.description || "",
  };

  const onSubmit = async (data: EditAccessoryForm) => {
    try {
      const payload = {
        ...data,
        quantity: Number(data.quantity),
        price: Number(data.price),
        totalPrice: Number(data.quantity) * Number(data.price), // Recalculate total
      };

      const result = await updatePurchase({
        id: accessory.id,
        data: payload,
      }).unwrap();

      toast.success(result.message || "Record updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update record");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-teal-600 border-teal-200 hover:bg-teal-50 shadow-sm"
          title="Edit Record"
        >
          <FaEdit size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-teal-700">
            Edit Purchase Record
          </DialogTitle>
        </DialogHeader>

        <FormProviderWrapper<EditAccessoryForm>
          onSubmit={onSubmit}
          defaultValues={defaultValues}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="md:col-span-2">
              <RHFInput
                label="Item Name"
                name="itemName"
                placeholder="e.g., Mosque Ceiling Fan"
                rules={{ required: "Item name is required" }}
              />
            </div>
            <RHFInput
              label="Quantity"
              name="quantity"
              type="number"
              rules={{ required: "Required" }}
            />
            <RHFInput
              label="Unit Price (৳)"
              name="price"
              type="number"
              rules={{ required: "Required" }}
            />
            <RHFInput
              label="Buyer Name"
              name="memberName"
              placeholder="Name of member"
            />
            <div className="md:col-span-2">
              <RHFTextarea
                label="Description"
                name="description"
                placeholder="Details about the purchase..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton
              isLoading={isLoading}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Update Changes
            </LoadingButton>
          </DialogFooter>
        </FormProviderWrapper>
      </DialogContent>
    </Dialog>
  );
}

export default EditAccessoryModal;
