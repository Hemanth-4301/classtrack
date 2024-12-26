import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { motion } from "framer-motion";

const Report = ({ file }) => {
  const [pdfFile, setPdfFile] = useState(file);

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center p-4 bg-slate-300 text-xl md:text-2xl lg:text-3xl py-[14px] my-4"
      >
        <b>Report</b>
      </motion.h1>
      <div className="max-w-4xl mx-auto p-4">
        <div
          style={{
            maxHeight: "600px",
            overflowY: "scroll",
          }}
          className="border-2 border-black rounded-lg p-3"
        >
          {/* Use the matching worker version */}
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile} />
          </Worker>
        </div>

        <div className="my-10 text-center">
          <a href={pdfFile} download="report.pdf">
            <button className="px-6 py-3 bg-black border-2 border-black text-white rounded-lg hover:bg-transparent hover:text-black">
              Download PDF
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Report;
