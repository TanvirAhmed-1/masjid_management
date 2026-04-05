"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

const FridayCollectionPDF = forwardRef<HTMLDivElement, any>(({ data }, ref) => {
  const collections = data?.data || [];
  const mosqueName =
    collections[0]?.mosque?.name || "মসজিদ ম্যানেজমেন্ট সিস্টেম";
  const printDate = format(new Date(), "dd/MM/yyyy hh:mm a");

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
          }

          /* টেবিল হেডার প্রতি পেজে রিপিট করার সিক্রেট */
          table { 
            width: 100%; 
            border-collapse: collapse; 
          }

          thead { 
            display: table-header-group; 
          }

          tfoot {
            display: table-footer-group;
          }

          tr { 
            page-break-inside: avoid; 
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
          }

          /* Header Section */
          .report-header {
            text-align: center;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }

          /* পেজ নাম্বার দেখানোর জন্য (CSS Counter) */
          .page-number::after {
            content: "পৃষ্ঠা নং: " counter(page);
          }
          
          body {
            counter-reset: page;
          }
        }
      `}</style>

      <div className="pdf-container">
        <table>
          {/* এই thead অংশটি প্রতি পেজে অটোমেটিক আসবে */}
          <thead>
            <tr>
              <th
                colSpan={4}
                style={{ border: "none", backgroundColor: "white" }}
              >
                <div className="report-header">
                  <h1
                    style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
                  >
                    {mosqueName}
                  </h1>
                  <p style={{ fontSize: "16px", margin: "5px 0" }}>
                    জুম্মা আদায় ও কালেকশন রিপোর্ট
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: "normal",
                      marginTop: "10px",
                    }}
                  >
                    <span>প্রিন্ট: {printDate}</span>
                    <span className="page-number"></span>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th style={{ width: "50px" }}>ক্র.নং</th>
              <th>কালেকশন তারিখ</th>
              <th>আদায়কারী নাম</th>
              <th>টাকার পরিমাণ</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((item: any, index: number) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{format(new Date(item.collectionDate), "dd-MM-yyyy")}</td>
                <td>{item.user?.name || "N/A"}</td>
                <td style={{ fontWeight: "bold" }}>
                  {item.amount.toLocaleString()} ৳
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
              <td
                colSpan={3}
                style={{ textAlign: "right", paddingRight: "15px" }}
              >
                সর্বমোট কালেকশন:
              </td>
              <td>
                {collections
                  .reduce((sum: number, curr: any) => sum + curr.amount, 0)
                  .toLocaleString()}{" "}
                ৳
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});

FridayCollectionPDF.displayName = "FridayCollectionPDF";
export default FridayCollectionPDF;
