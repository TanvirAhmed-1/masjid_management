"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

interface IProps {
  data: any[]; // এটি data?.result?.data হবে
}

const TarabiPaymentPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const printDate = format(new Date(), "dd/MM/yyyy hh:mm a");
  const mosqueName = data?.[0]?.mosque?.name || "মসজিদ ম্যানেজমেন্ট সিস্টেম";

  return (
    <div ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');
        
        .pdf-wrapper { display: none; }

        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          .pdf-wrapper {
            display: block !important;
            font-family: 'Tiro Bangla', serif;
            background: white;
            width: 100%;
            color: black;
          }

          .report-header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

          table { 
            width: 100%; 
            border-collapse: collapse; 
          }

          thead { display: table-header-group; }

          th, td { 
            border: 1px solid black !important; 
            padding: 10px; 
            text-align: center;
            font-size: 14px;
          }

          th {
            background-color: #f2f2f2 !important;
            -webkit-print-color-adjust: exact;
            font-weight: bold;
          }

          .text-left { text-align: left; padding-left: 10px; }
          .font-bold { font-weight: bold; }
          .due-text { color: #d32f2f !important; } /* লাল রং ডিউ এর জন্য */
          
          .summary-section {
             margin-top: 20px;
             font-size: 14px;
             text-align: right;
          }
        }
      `}</style>

      <div className="pdf-wrapper">
        {/* Header */}
        <div className="report-header">
          <h1 style={{ fontSize: "28px", margin: 0 }}>{mosqueName}</h1>
          <h2 style={{ fontSize: "20px", margin: "5px 0" }}>তারাবি পেমেন্ট রিপোর্ট</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "13px" }}>
            <span>রমজান বছর: {data?.[0]?.ramadanYear?.ramadanYear || "---"}</span>
            <span>প্রিন্ট তারিখ: {printDate}</span>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>নং</th>
              <th>মেম্বারের নাম ও ফোন</th>
              <th>নির্ধারিত টাকা</th>
              <th>পেইড টাকা</th>
              <th>বকেয়া (Due)</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <div className="font-bold">{item.member?.name}</div>
                    <div style={{ fontSize: "12px" }}>{item.member?.phone}</div>
                  </td>
                  <td>{item.amount?.toLocaleString()} ৳</td>
                  <td style={{ color: "green" }}>{item.paidAmount?.toLocaleString()} ৳</td>
                  <td className="font-bold due-text">
                    {item.dueAmount?.toLocaleString()} ৳
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>কোন পেমেন্ট ডাটা পাওয়া যায়নি</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
              <td colSpan={2} style={{ textAlign: "right", paddingRight: "15px" }}>সর্বমোট:</td>
              <td>{data?.reduce((sum, item) => sum + (item.amount || 0), 0).toLocaleString()} ৳</td>
              <td>{data?.reduce((sum, item) => sum + (item.paidAmount || 0), 0).toLocaleString()} ৳</td>
              <td>{data?.reduce((sum, item) => sum + (item.dueAmount || 0), 0).toLocaleString()} ৳</td>
            </tr>
          </tfoot>
        </table>

        {/* Footer info */}
        <div style={{ marginTop: "30px", fontSize: "12px", fontStyle: "italic", textAlign: "center" }}>
          * এই রিপোর্টটি মসজিদ ম্যানেজমেন্ট সিস্টেম থেকে অটো-জেনারেটেড।
        </div>
      </div>
    </div>
  );
});

TarabiPaymentPDF.displayName = "TarabiPaymentPDF";
export default TarabiPaymentPDF;