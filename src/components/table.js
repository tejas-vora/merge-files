import React from "react";
import { toast } from "react-toastify";
import jsonData from "../db.json";

const Table = ({ tableData }) => {
  function CopyToClipboard(id) {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    toast("copy to clipboard");
  }

  const sendMessage = (PartyName, Bill, Cash) => {
    let message = `Dear Sir,
    an amount is Due
    BILL Rs *${Bill == 0 ? "00" : Bill}*
    CASH Rs *${Cash == 0 ? "00" : Cash}*
    please take into consideration`;
    encodeURI(message);

    jsonData.find(({ NAME, NUMBER }) => {
      if (NAME == PartyName) {
        window.open(
          `https://wa.me/91${NUMBER}?text=${encodeURI(message)}`,
          "_blank"
        );
      }
    });
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
