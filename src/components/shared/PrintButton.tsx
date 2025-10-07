"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

interface PrintButtonProps<T> {
  data?: T | null;
  FormComponent: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<{ data: T }> & React.RefAttributes<HTMLDivElement>
  >;
  documentTitle?: string;
  pageWidth?: string;
  pageHeight?: string;
  margin?: string;
}

export default function PrintButton<T>({
  data,
  FormComponent,
  documentTitle = "Form",
  pageWidth = "21cm",
  pageHeight = "29.7cm",
  margin = "20mm",
}: PrintButtonProps<T>) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle,
    pageStyle: `
      @page {
        size: ${pageWidth} ${pageHeight};
        margin: ${margin};
      }
    `,
    onAfterPrint: () => setShowPreview(false),
  });

  const handleClick = () => {
    if (!data) {
      alert("No data send  to printform ");
      return;
    }
    setShowPreview(true);
    setTimeout(() => {
      handlePrint?.();
    }, 50);
  };

  return (
    <div>
      <button onClick={handleClick}></button>

      {/* Hidden printable area */}
      <div
        style={{
          display: showPreview ? "block" : "none",
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: pageWidth,
          height: pageHeight,
        }}
      >
        <div className="print-area max-w-[1200px] mx-auto">
          {data && <FormComponent ref={componentRef} data={data} />}
        </div>
      </div>
    </div>
  );
}
