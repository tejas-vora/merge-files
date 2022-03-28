import React, { useState, useEffect } from "react";
import ReactExport from "react-data-export";
import Table from "./table";

const Merge = ({ withData, withOutData }) => {
  const [finalData, setFinalData] = useState([]);
  const [data, setData] = useState([]);

  function mergeArray(arr) {
    var outputObj = {};
    for (var counter = 0; counter < arr.length; counter++) {
      var obj = arr[counter];
      for (var key in obj) {
        if (!outputObj[key]) {
          outputObj[key] = obj[key];
        }
      }
    }
    return outputObj;
  }
  function collateArray(withData, withOutData) {
    var arr = [...withData, ...withOutData];
    var outputObj = {};
    var result = [];
    for (var counter = 0; counter < arr.length; counter++) {
      var obj = arr[counter];
      var value = obj["name"];
      if (!outputObj[value]) {
        outputObj[value] = [];
      }
      outputObj[value].push(obj);
    }
    for (var key in outputObj) {
      result.push(mergeArray(outputObj[key]));
    }
    setData(result);
  }

  useEffect(() => {
    let finalResult = [];
    if (data.length != 0) {
      data.map(({ name, amt, amt1 }) => {
        if (
          (amt1 == undefined ? 0 : parseInt(amt1)) +
            (amt == undefined ? 0 : parseInt(amt)) !=
          0
        ) {
          finalResult.push({
            PartyName: name,
            Bill: amt1 == undefined ? 0 : parseInt(amt1),
            Cash: amt == undefined ? 0 : parseInt(amt),
            TotalAmount:
              (amt1 == undefined ? 0 : parseInt(amt1)) +
              (amt == undefined ? 0 : parseInt(amt)),
          });
        }
      });
    }

    finalResult.sort((a, b) =>
      a.PartyName > b.PartyName ? 1 : b.PartyName > a.PartyName ? -1 : 0
    );
    var index = finalResult.findIndex((p) => p.PartyName == "Grand Total");
    finalResult.push(finalResult.splice(index, 1)[0]);
    setFinalData(finalResult);

    console.log(finalResult);
  }, [data]);

  const monthNames = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  const output = day + "/" + month + "/" + year;
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <>
      <div className="my-3">
        <button
          className="btn btn-primary  mx-3"
          onClick={() => collateArray(withData, withOutData)}
        >
          Merge
        </button>
        <ExcelFile filename={`Payment Details-${output}`}>
          <ExcelSheet data={finalData} name="customer">
            <ExcelColumn label="PartyName" value="PartyName" />
            <ExcelColumn label="Bill" value="Bill" />
            <ExcelColumn label="Cash" value="Cash" />
            <ExcelColumn label="TotalAmount" value="TotalAmount" />
          </ExcelSheet>
        </ExcelFile>
      </div>
      <Table tableData={finalData} />
    </>
  );
};

export default Merge;
