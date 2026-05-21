"use client";

import { FormProviderWrapper } from "@/src/components/shared/FormProviderWrapper";
import RHFDatePicker from "@/src/components/shared/RHFDatePicker";
import RHFSearchSelect from "@/src/components/shared/RHFSearchSelect";
import { Button } from "@/src/components/ui/button";
import { useGetMembersQuery } from "@/src/redux/features/monthly-salary/memberApi";
import { useGetRamadanYearQuery } from "@/src/redux/features/ramadan/ramadanDataSetUpApi";
import { IoReload, IoSearch } from "react-icons/io5";
import { useTranslationContext } from "@/src/contexts/TranslationContext";

type Props = {
  onSearch: (data?: any) => void;
};

const SearchTarabi = ({ onSearch }: Props) => {
  const { data: membersData } = useGetMembersQuery(undefined);
  const { data: yearsData } = useGetRamadanYearQuery(undefined);
  const { t } = useTranslationContext();

  return (
    <div className=" p-4  ">
      <FormProviderWrapper onSubmit={onSearch}>
        {({ reset }) => (
          <div className="grid md:grid-cols-5 grid-cols-1 gap-4 items-end">
            {/* Member Search Select */}
            <RHFSearchSelect
              label={t("member_name")}
              name="memberId"
              options={
                membersData?.result?.data?.map((m: any) => ({
                  label: m.name,
                  value: m.id,
                })) || []
              }
              placeholder={t("search_member")}
            />

            {/* Ramadan Year Search Select */}
            <RHFSearchSelect
              label={t("ramadan_year")}
              name="ramadanYearId"
              options={
                yearsData?.result?.data?.map((y: any) => ({
                  label: `${y.titleName} (${y.ramadanYear})`,
                  value: y.id,
                })) || []
              }
              placeholder={t("search_year")}
            />

            <RHFDatePicker
              label={t("from_date")}
              name="from"
              placeholder={t("start_date")}
            />

            <RHFDatePicker
              label={t("to_date")}
              name="to"
              placeholder={t("end_date")}
            />

            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <IoSearch className="mr-2" /> {t("search")}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  reset();
                  onSearch({});
                }}
                className="bg-slate-700 hover:bg-slate-800 text-white"
                title={t("reset_button") || "Reset"}
              >
                <IoReload />
              </Button>
            </div>
          </div>
        )}
      </FormProviderWrapper>
    </div>
  );
};

export default SearchTarabi;
