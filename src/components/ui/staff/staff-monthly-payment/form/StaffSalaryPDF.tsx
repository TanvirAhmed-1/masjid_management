"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

interface IProps {
  data: any[]; // এটি apiResponse?.result?.data হবে
}

const StaffSalaryPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const printDate = format(new Date(), "dd/MM/yyyy hh:mm a");
  const mosqueName = data?.[0]?.mosque?.name || "মসজিদ স্টাফ স্যালারি ম্যানেজমেন্ট";

  return (
    <div ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');
        
        .pdf-container { display: none; }

        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          .pdf-container {
            display: block !important;
            font-family: 'Tiro Bangla', serif;
            background: white;
            width: 100%;
            color: black;
          }

          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }

          .header-section {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

          table { 
            width: 100%; 
            border-collapse: collapse; 
          }

          th, td { 
            border: 1px solid black !important; 
            padding: 8px; 
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
        }
      `}</style>

      <div className="pdf-container">
        {/* Header Section */}
        <div className="header-section">
          <h1 style={{ fontSize: "28px", margin: 0 }}>{mosqueName}</h1>
          <h2 style={{ fontSize: "20px", margin: "5px 0" }}>স্টাফ মাসিক বেতন রিপোর্ট</h2>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", fontSize: "13px" }}>
            <span>রিপোর্ট জেনারেট: {printDate}</span>
            <span>মোট রেকর্ড: {data?.length} টি</span>
          </div>
        </div>

        {/* Salary Table */}
        <table>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>ক্র.নং</th>
              <th>স্টাফের নাম ও পদবী</th>
              <th>বেতনের মাস</th>
              <th>মূল বেতন</th>
              <th>প্রদানকৃত বেতন</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="text-left">
                    <div className="font-bold">{item.staff?.name}</div>
                    <div style={{ fontSize: "12px", color: "#555" }}>পদবী: {item.staff?.role}</div>
                  </td>
                  <td>{item.month ? format(new Date(item.month), "MMMM yyyy") : "---"}</td>
                  <td>{item.staff?.baseSalary?.toLocaleString()} ৳</td>
                  <td className="font-bold">{item.totalSalary?.toLocaleString()} ৳</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>কোন বেতনের ডাটা পাওয়া যায়নি</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
              <td colSpan={4} style={{ textAlign: "right", paddingRight: "15px" }}>সর্বমোট প্রদানকৃত বেতন:</td>
              <td>
                {data?.reduce((sum, item) => sum + (item.totalSalary || 0), 0).toLocaleString()} ৳
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Footer Signature Area */}
        <div style={{ marginTop: "60px", display: "flex", justifyContent: "space-between", padding: "0 50px" }}>
          <div style={{ borderTop: "1px solid black", width: "150px", textAlign: "center", paddingTop: "5px" }}>স্টাফের স্বাক্ষর</div>
          <div style={{ borderTop: "1px solid black", width: "150px", textAlign: "center", paddingTop: "5px" }}>কর্তৃপক্ষের স্বাক্ষর</div>
        </div>
      </div>
    </div>
  );
});

StaffSalaryPDF.displayName = "StaffSalaryPDF";
export default StaffSalaryPDF;