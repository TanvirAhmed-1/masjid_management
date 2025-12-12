// src/components/shared/useConfirm.ts
import Swal from "sweetalert2";

export const useConfirm = () => {
  const confirm = async (message = "Are you sure?"): Promise<boolean> => {
    const result = await Swal.fire({
      title: message,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    return result.isConfirmed;
  };

  const success = (message = "Action completed successfully!") => {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
    });
  };

  const error = (message = "Something went wrong!") => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
    });
  };

  return { confirm, success, error };
};
