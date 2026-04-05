// "use client";

// import React, { useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";

// interface PrintButtonProps<T> {
//   data?: T | null;
//   FormComponent: React.ForwardRefExoticComponent<
//     React.PropsWithoutRef<{ data: T }> & React.RefAttributes<HTMLDivElement>
//   >;
//   documentTitle?: string;
//   pageWidth?: string;
//   pageHeight?: string;
//   margin?: string;
// }

// export default function PrintButton<T>({
//   data,
//   FormComponent,
//   documentTitle = "Form",
//   pageWidth = "21cm",
//   pageHeight = "29.7cm",
//   margin = "20mm",
// }: PrintButtonProps<T>) {
//   const componentRef = useRef<HTMLDivElement>(null);
//   const [showPreview, setShowPreview] = useState(false);

//   const handlePrint = useReactToPrint({
//     contentRef: componentRef,
//     documentTitle,
//     pageStyle: `
//       @page {
//         size: ${pageWidth} ${pageHeight};
//         margin: ${margin};
//       }
//     `,
//     onAfterPrint: () => setShowPreview(false),
//   });

//   const handleClick = () => {
//     if (!data) {
//       alert("No data send  to printform ");
//       return;
//     }
//     setShowPreview(true);
//     setTimeout(() => {
//       handlePrint?.();
//     }, 50);
//   };

//   return (
//     <div>
//       <button onClick={handleClick}></button>

//       {/* Hidden printable area */}
//       <div
//         style={{
//           display: showPreview ? "block" : "none",
//           position: "absolute",
//           left: "-9999px",
//           top: "-9999px",
//           width: pageWidth,
//           height: pageHeight,
//         }}
//       >
//         <div className="print-area max-w-[1200px] mx-auto">
//           {data && <FormComponent ref={componentRef} data={data} />}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";

interface PrintButtonProps<T> {
  data: T;
  FormComponent: React.ElementType;
  onBeforePrint?: () => Promise<void>;
  documentTitle?: string;
}

export default function PrintButton<T>({
  data,
  FormComponent,
  onBeforePrint,
  documentTitle = "Document",
}: PrintButtonProps<T>) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle,
  });

  const onButtonClick = async () => {
    if (onBeforePrint) await onBeforePrint();
    handlePrint();
  };

  return (
    <>
      <button
        onClick={onButtonClick}
        className="flex items-center cursor-pointer text-sm gap-2 px-2 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700 transition"
      >
        <FaPrint /> প্রিন্ট রিপোর্ট
      </button>

      {/* প্রিন্ট এরিয়া: এটা স্ক্রিন থেকে পুরোপুরি লুকানো থাকবে, কোনো বর্ডার বা গ্যাপ তৈরি করবে না */}
      <div style={{ display: "none" }}>
        <div ref={contentRef} className="print-container">
          <FormComponent data={data} />
        </div>
      </div>

      <style jsx global>{`
        @media print {
          /* প্রিন্ট এরিয়াকে প্রিন্টের সময় ব্লক হিসেবে দেখাবে */
          .print-container {
            display: block !important;
          }
          /* মেইন টেবিল এবং অন্যান্য UI প্রিন্টের সময় হাইড করে দেবে */
          body > *:not(.print-container) {
            /* display: none !important; */
            /* react-to-print অটোমেটিক এটা হ্যান্ডেল করে, তাই চিন্তা নেই */
          }
        }
      `}</style>
    </>
  );
}
