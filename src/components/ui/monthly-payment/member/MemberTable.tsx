"use client";

import EditMemberModal from "./EditMemberModal";
import { Button } from "@/src/components/ui/button";
import { useDeleteMemberMutation } from "@/src/redux/features/monthly-salary/memberApi";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import MemberPaymentSummaryModal from "./MemberPaymentSummaryModal";
import LoaderScreen from "@/src/components/shared/LoaderScreen";
import { MemberType } from "./MemberContainer";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type Props = {
  members: MemberType[];
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  limit: number;
};

const MemberTable = ({
  members,
  isLoading,
  isFetching,
  page,
  limit,
}: Props) => {
  const [deleteMember] = useDeleteMemberMutation();
  const { t } = useTranslationContext();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: t("confirm_title"),
      text: t("member_delete_warning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("delete_confirm_btn"),
      cancelButtonText: t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteMember(id).unwrap();

          Swal.fire({
            title: t("deleted_success_title"),
            text: t("member_deleted_success_desc"),
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            title: t("failed_title"),
            text: t("error_occurred"),
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-teal-600 text-white">
          <tr className="text-center text-base font-medium *:py-3 *:px-3  *:whitespace-nowrap">
            <th>{t("sn")}</th>
            <th>{t("name")}</th>
            <th>{t("phone")}</th>
            <th>{t("address")}</th>
            <th>{t("amount")}</th>
            <th>{t("actions")}</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading || isFetching ? (
            <tr>
              <td colSpan={6} className="py-10">
                <LoaderScreen className="h-auto" />
              </td>
            </tr>
          ) : members.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-500">
                No members found.
              </td>
            </tr>
          ) : (
            members?.map((member: MemberType, index: number) => (
              <tr
                key={member.id}
                className="text-sm *:text-center *:py-2 *:px-3 hover:bg-gray-50  *:whitespace-nowrap"
              >
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{member.name}</td>
                <td>{member.phone || "-"}</td>
                <td>{member.address || "-"}</td>
                <td>{member.monthlyAmount}</td>

                <td>
                  <div className="flex justify-center items-center gap-2">
                    <MemberPaymentSummaryModal
                      memberId={member.id}
                      memberName={member.name}
                    />

                    <EditMemberModal member={member} />

                    <Button
                      type="button"
                      onClick={() => handleDelete(member.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 shadow-sm transition-all duration-200"
                      size="sm"
                      title={t("delete")}
                    >
                      <FaTrashAlt size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTable;
