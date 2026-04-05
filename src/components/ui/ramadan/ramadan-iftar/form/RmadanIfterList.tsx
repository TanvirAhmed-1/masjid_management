"use client";

import React, { forwardRef } from "react";
import { format } from "date-fns";

interface IProps {
  data: any[];
}

const RamadanIftarPDF = forwardRef<HTMLDivElement, IProps>(({ data }, ref) => {
  const printDate = format(new Date(), "dd/MM/yyyy hh:mm a");
  const mosqueName = data?.[0]?.mosque?.name || "মসজিদ ইফতার ম্যানেজমেন্ট";

  // ডোনারদের সিরিয়াল অনুযায়ী সাজানো
  const allDonors = data?.[0]?.doners || [];

  // ১০ দিন করে ভাগ করার ফাংশন
  const getStageTitle = (index: number) => {
    if (index < 10) return "রহমতের ১০ দিন (১ - ১০ রমজান)";
    if (index < 20) return "মাগফিরাতের ১০ দিন (১১ - ২০ রমজান)";
    return "নাজাতের ১০ দিন (২১ - ৩০ রমজান)";
  };

  return (
    <div ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Bangla&display=swap');
        
        .pdf-container { display: none; }

        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          .pdf-container {
            display: block !important;
            font-family: 'Tiro Bangla', serif;
            background: white;
            width: 100%;
            color: black;
          }

          .header-title {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
            margin-bottom: 15px;
          }

          .stage-header {
            background-color: #333 !important;
            color: white !important;
            text-align: center;
            padding: 5px;
            font-weight: bold;
            font-size: 16px;
            -webkit-print-color-adjust: exact;
            margin-top: 10px;
          }

          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-bottom: 10px;
          }

          th, td { 
            border: 1px solid black !important; 
            padding: 6px; 
            text-align: center;
            font-size: 14px;
          }

          th {
            background-color: #f2f2f2 !important;
            -webkit-print-color-adjust: exact;
            font-weight: bold;
          }

          tr { page-break-inside: avoid; }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin-bottom: 5px;
          }
        }
      `}</style>

      <div className="pdf-container">
        <div className="header-title">
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: 0 }}>
            {mosqueName}
          </h1>
          <h2 style={{ fontSize: "20px", margin: "2px 0" }}>
            রমজানুল মোবারক: ইফতারের  তালিকা
          </h2>
          <div className="info-row">
            <span>বছর: {data?.[0]?.ramadanyear?.ramadanYear}</span>
            <span>শিরোনাম: {data?.[0]?.ramadanyear?.titleName}</span>
            <span>প্রিন্ট: {printDate}</span>
          </div>
        </div>

        {/* রহমত, মাগফিরাত ও নাজাতের ৩টি ধাপ */}
        {[0, 10, 20].map((startIdx) => {
          const stageDonors = allDonors.slice(startIdx, startIdx + 10);
          return (
            <div key={startIdx} className="stage-section">
              <div className="stage-header">{getStageTitle(startIdx)}</div>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "10%" }}>সিরিয়াল</th>
                    <th style={{ width: "20%" }}>তারিখ</th>
                    <th style={{ width: "20%" }}>দিন</th>
                    <th style={{ width: "50%" }}>ডোনারের নাম</th>
                  </tr>
                </thead>
                <tbody>
                  {stageDonors.length > 0 ? (
                    stageDonors.map((donor: any) => (
                      <tr key={donor.id}>
                        <td>{donor.serialNumber}</td>
                        <td>
                          {donor.iftarDate
                            ? format(new Date(donor.iftarDate), "dd-MM-yyyy")
                            : "---"}
                        </td>
                        <td>{donor.dayName}</td>
                        <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                          {donor.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: "5px",
                          fontSize: "12px",
                          color: "#555",
                        }}
                      >
                        তথ্য পাওয়া যায়নি
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          );
        })}

        <div
          style={{
            textAlign: "center",
            fontSize: "11px",
            marginTop: "10px",
            fontStyle: "italic",
            borderTop: "1px dashed #ccc",
            paddingTop: "5px",
          }}
        >
          "ইফতার দানকারীর জন্য রয়েছে অফুরন্ত সওয়াব ও মাগফিরাত।" - আল হাদিস
        </div>
      </div>
    </div>
  );
});

RamadanIftarPDF.displayName = "RamadanIftarPDF";
export default RamadanIftarPDF;
