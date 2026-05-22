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
import { useGetRamadanIdBaseListQuery } from "@/src/redux/features/ramadan/itikafApi";
import { FaEye } from "react-icons/fa";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB");
}

function ShowItikafListModal({ id }: { id: string }) {
  const { data: itkafList, isLoading } = useGetRamadanIdBaseListQuery(id);
  const { t } = useTranslationContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded"
        >
          <FaEye size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:min-w-2xl w-full mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            {t("itikaf_list")}
          </DialogTitle>
        </DialogHeader>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-600">{t("creating")}</p>
        )}

        {/* No Data */}
        {!isLoading && (!itkafList?.result || itkafList?.result?.length === 0) && (
          <p className="text-center text-red-500 font-semibold">
            {t("no_itikaf_record")}
          </p>
        )}

        {/* Table */}
        {!isLoading && itkafList?.result?.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="table-auto w-full text-sm border border-gray-300">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="p-2 border">{t("sn")}</th>
                  <th className="p-2 border">{t("name")}</th>
                  <th className="p-2 border">{t("from_date")}</th>
                  <th className="p-2 border">{t("to_date")}</th>
                </tr>
              </thead>
              <tbody>
                {itkafList.result.map((item: any, index: number) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{formatDate(item.fromDate)}</td>
                    <td className="p-2 border">{formatDate(item.toDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShowItikafListModal;
