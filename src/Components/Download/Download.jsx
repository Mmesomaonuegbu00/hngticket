import React, { useState, useEffect } from "react";
import JsBarcode from "jsbarcode";
import "./download.css";

const Download = ({ ticketRef }) => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    message: "",
    profileImageUrl: "",
    ticketAmount: "",
    vipSelection: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("savedFormData");
    const ticketAmount = localStorage.getItem("tickets");
    const vipSelection = localStorage.getItem("vipSelection");

    if (savedData) {
      setData({ ...JSON.parse(savedData), ticketAmount: ticketAmount || "", vipSelection: vipSelection || "" });
    }
  }, []);

  useEffect(() => {
    JsBarcode("#barcode", "234567891026", { format: "CODE128", background: "none", lineColor: "#FFFFFF", width: 1.5, height: 50, displayValue: false });
  }, []);

  return (
    <div className="step-three">
      <div className="head3">
        <h2>Your Ticket is Booked!</h2>
        <p>Check your email for a copy or you can download</p>
      </div>

      <div className="main-ticket">
        <div className="ticket-container" ref={ticketRef}>
          <div className="ticket">
            <div className="head4">
              <h3>Techember Fest ”25</h3>
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p>📅 March 15, 2025 | 7:00 PM</p>
            </div>
            {data.profileImageUrl && <img src={data.profileImageUrl} alt="Uploaded" />}
            <div className="display-container">
              <table className="table">
                <tbody>
                  <tr className="row">
                    <td className="column"><label>Enter your name</label><div className="value">{data.fullName}</div></td>
                    <td className="column"><label>Enter your email *</label><div className="value">{data.email}</div></td>
                  </tr>
                  <tr className="row">
                    <td className="column"><label>Ticket for :</label><div className="value">{data.ticketAmount}</div></td>
                    <td className="column"><label>Ticket Type:</label><div className="value">{data.vipSelection}</div></td>
                  </tr>
                  <tr className="row textarea">
                    <td colSpan="2" className="textarea"><label>Message</label><div className="value">{data.message}</div></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <svg id="barcode" className="barcode"></svg>
        </div>
      </div>
    </div>
  );
};

export default Download;
