"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

interface IProps {
  data: {
    id: string;
    date: string;
    otherCollectionName?: {
      title: string;
      description: string;
    };
    donors: {
      id: string;
      name: string;
      amount: number;
      createdAt: string;
    }[];
  };
}

const CollectionPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const donors = data?.donors || [];
  const collectionTitle = data?.otherCollectionName?.title || "কালেকশন রিপোর্ট";
  const collectionDate = data?.date ? format(new Date(data.date), "dd-MM-yyyy") : "N/A";
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

          table { 
            width: 100%; 
            border-collapse: collapse; 
          }

          thead { 
            display: table-header-group; 
          }

          tr { 
            page-break-inside: avoid; 
          }

          th, td { 
            border: 1px solid black !important; 
            padding: 10px; 
            text-align: center;
            font-size: 16px;
          }

          th {
            background-color: #f2f2f2 !important;
            -webkit-print-color-adjust: exact;
          }

          .report-header {
            text-align: center;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }

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
          <thead>
            <tr>
              <th colSpan={3} style={{ border: 'none', backgroundColor: 'white' }}>
                <div className="report-header">
                  <h1 style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}>কালেকশন ও ডোনার রিপোর্ট</h1>
                  <h2 style={{ fontSize: "20px", color: "#333" }}>{collectionTitle}</h2>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "normal", marginTop: "15px" }}>
                    <span>কালেকশন তারিখ: {collectionDate}</span>
                    <span>প্রিন্ট তারিখ: {printDate}</span>
                    <span className="page-number"></span>
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th style={{ width: "80px" }}>ক্র.নং</th>
              <th>ডোনারের নাম</th>
              <th style={{ width: "200px" }}>টাকার পরিমাণ</th>
            </tr>
          </thead>

          <tbody>
            {donors.map((donor, index) => (
              <tr key={donor.id}>
                <td>{index + 1}</td>
                <td style={{ textAlign: 'left', paddingLeft: '20px' }}>{donor.name}</td>
                <td style={{ fontWeight: "bold" }}>
                  {donor.amount.toLocaleString()} ৳
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>
              <td colSpan={2} style={{ textAlign: "right", paddingRight: "20px" }}>সর্বমোট ডোনার কালেকশন:</td>
              <td>
                {donors.reduce((sum, curr) => sum + curr.amount, 0).toLocaleString()} ৳
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});

CollectionPDF.displayName = "CollectionPDF";
export default CollectionPDF;