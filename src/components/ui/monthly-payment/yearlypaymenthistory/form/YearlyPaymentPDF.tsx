"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

interface IProps {
  data: {
    result: any[];
    year: string;
  };
}

const YearlyPaymentPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const members = data?.result || [];
  const year = data?.year;
  const mosqueName = members[0]?.mosque?.name || "মসজিদ ম্যানেজমেন্ট সিস্টেম";

  // ১২ মাসের লিস্ট তৈরি
  const months = Array.from({ length: 12 }, (_, i) => ({
    monthKey: `${year}-${String(i + 1).padStart(2, "0")}`,
    monthName: format(new Date(Number(year), i), "MMM"),
  }));

  return (
    <div ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');
        
        .pdf-wrapper { display: none; }

        @media print {
          @page {
            size: A4 landscape; /* ল্যান্ডস্কেপ মোড ১২ মাসের জন্য পারফেক্ট */
            margin: 10mm;
          }

          .pdf-wrapper {
            display: block !important;
            font-family: 'Tiro Bangla', serif;
            background: white;
            width: 100%;
          }

          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }

          table { 
            width: 100%; 
            border-collapse: collapse; 
            table-layout: fixed; /* কলামের মাপ ঠিক রাখার জন্য */
          }

          th, td { 
            border: 1px solid #000 !important; 
            padding: 4px 2px; 
            text-align: center;
            font-size: 11px; /* ১২ মাস তাই ফন্ট ছোট করা হয়েছে */
            word-wrap: break-word;
          }

          th {
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact;
            font-weight: bold;
          }

          .paid-cell { color: #16a34a !important; font-weight: bold; }
          .due-cell { color: #dc2626 !important; }
          
          .member-info { text-align: left; padding-left: 5px; font-weight: bold; font-size: 10px; }
        }
      `}</style>

      <div className="pdf-wrapper">
        <div className="header">
          <h1 style={{ fontSize: "24px", margin: 0 }}>{mosqueName}</h1>
          <h2 style={{ fontSize: "18px", margin: "5px 0" }}>
            বার্ষিক পেমেন্ট রিপোর্ট - {year}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <span>রিপোর্ট জেনারেট: {format(new Date(), "dd/MM/yyyy")}</span>
            <span>মোট সদস্য: {members.length}</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ width: "120px" }}>সদস্য</th>
              {months.map((m) => (
                <th key={m.monthKey}>{m.monthName}</th>
              ))}
              <th style={{ width: "60px" }}>মোট জমা</th>
              <th style={{ width: "60px" }}>বকেয়া</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member: any) => {
              const payments = member.payments || [];
              const totalPaid = payments.reduce(
                (sum: number, p: any) => sum + p.amount,
                0,
              );
              const paidCount = payments.length;
              const dueAmount = (12 - paidCount) * member.monthlyAmount;

              return (
                <tr key={member.id}>
                  <td className="member-info">
                    {member.name}
                    <div style={{ fontWeight: "normal", fontSize: "9px" }}>
                      {member.phone}
                    </div>
                  </td>

                  {months.map((m) => {
                    const p = payments.find(
                      (pay: any) => pay.monthKey === m.monthKey,
                    );
                    return (
                      <td
                        key={m.monthKey}
                        className={p ? "paid-cell" : "due-cell"}
                      >
                        {p ? `${p.amount}৳` : "-"}
                      </td>
                    );
                  })}

                  <td style={{ fontWeight: "bold", color: "#16a34a" }}>
                    {totalPaid}৳
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: dueAmount > 0 ? "#dc2626" : "#16a34a",
                    }}
                  >
                    {dueAmount > 0 ? `${dueAmount}৳` : "Clear"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

YearlyPaymentPDF.displayName = "YearlyPaymentPDF";
export default YearlyPaymentPDF;
