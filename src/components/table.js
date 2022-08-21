import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import jsonData from "../db.json";

const Table = ({ tableData }) => {
  const [jsonData, setJsonData] = useState([]);
  const [jsonData1, setJsonData1] = useState([]);

  function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    toast("copy to clipboard");
  }

  useEffect(async () => {
    await fetch("https://629224419d159855f0865064.mockapi.io/testapi")
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((err) => console.log(err));

    await fetch("https://629224419d159855f0865064.mockapi.io/test1api")
      .then((response) => response.json())
      .then((data) => setJsonData1(data))
      .catch((err) => console.log(err));
  }, []);

  const sendMessage = (PartyName, Bill, Cash) => {
    let message = `Dear Sir,
    an amount is Due
    BILL Rs *${Bill == 0 ? "00" : Bill}*
    CASH Rs *${Cash == 0 ? "00" : Cash}*
    please take into consideration`;
    encodeURI(message);
    if (jsonData.length !== 0) {
      jsonData.find(({ NAME, NUMBER }) => {
        if (NAME == PartyName) {
          window.open(
            `https://wa.me/91${NUMBER}?text=${encodeURI(message)}`,
            "_blank"
          );
        }
      });
    }
    if (jsonData1.length !== 0) {
      jsonData1.find(({ NAME, NUMBER }) => {
        if (NAME == PartyName) {
          window.open(
            `https://wa.me/91${NUMBER}?text=${encodeURI(message)}`,
            "_blank"
          );
        }
      });
    }
  };
  const getNumber = (PartyNmae) => {
    let partyData = [...jsonData, ...jsonData1];
    let partyNumber = [];
    if (partyData.length !== 0) {
      partyNumber = partyData.find(({ NAME, NUMBER }) => {
        if (NAME === PartyNmae) return NUMBER;
      });
    }
    if (partyNumber !== undefined) return partyNumber.NUMBER;
  };

  return (
    <>
      <div>
        {tableData.length != 0 && tableData[0] !== undefined && (
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col">PartyName</th>
                <th scope="col">Bill</th>
                <th scope="col">Cash</th>
                <th scope="col">TotalAmount</th>
                {window.innerWidth > 800 && <th scope="col">Message</th>}
                <th>Number</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ PartyName, Bill, Cash, TotalAmount }, key) => (
                <tr key={key}>
                  <th
                    onClick={() => sendMessage(PartyName, Bill, Cash)}
                    className="pointer"
                  >
                    {PartyName}
                  </th>
                  <td>{Bill}</td>
                  <td>{Cash}</td>
                  <td>{TotalAmount}</td>
                  {window.innerWidth > 800 && (
                    <td>
                      <div
                        id={`copy${key}`}
                        className="pointer"
                        onClick={() => CopyToClipboard(`copy${key}`)}
                      >
                        <div>Dear Sir,</div>
                        <div>an amount is Due</div>
                        <div>BILL Rs *{Bill == 0 ? "00" : Bill}*</div>
                        <div>CASH Rs *{Cash == 0 ? "00" : Cash}*</div>
                        <div>please take into consideration</div>
                      </div>
                    </td>
                  )}
                  <td>{getNumber(PartyName)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default Table;
