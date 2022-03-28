import React, { useState } from "react";
import XLSX from "xlsx";
import Merge from "./Merge";
import { SheetJSFT } from "./types";

const ExcelReader = () => {
  const [withData, setWithData] = useState([]);
  const [withOutData, setWithOutData] = useState([]);

  const handleFile = (file, value) => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      if (value == "withData") {
        setWithData(XLSX.utils.sheet_to_json(ws));
      } else if (value == "withOutData") {
        setWithOutData(XLSX.utils.sheet_to_json(ws));
      }
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };
  const handleChange = (e, value) => {
    handleFile(e.target.files[0], value);
  };

  return (
    <>
      <div className="input_field">
        <div>
          <label htmlFor="file">With File </label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT}
            onChange={(e) => handleChange(e, "withData")}
          />
        </div>
        <div>
          <label htmlFor="file1">With Out File </label>
          <input
            type="file"
            className="form-control"
            id="file1"
            accept={SheetJSFT}
            onChange={(e) => handleChange(e, "withOutData")}
          />
        </div>
      </div>
      <Merge withData={withData} withOutData={withOutData} />
    </>
  );
};

export default ExcelReader;
