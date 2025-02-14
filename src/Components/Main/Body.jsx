import React, { useState, useEffect, useRef } from "react";
import "./body.css";
import Download from "../Download/Download";
import UploadProfilePhoto from "../Form/Upload";
import html2canvas from "html2canvas";

const Body = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tickets: localStorage.getItem("tickets") || "",
    vipSelection: localStorage.getItem("vipSelection") || "",
  });
  const [error, setError] = useState("");
  const ticketRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tickets", formData.tickets);
    localStorage.setItem("vipSelection", formData.vipSelection);
  }, [formData]);

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Ticket Selection";
      case 2:
        return "Attendee Details";
      case 3:
        return "Ready";
      default:
        return "Ticket Selection";
    }
  };

  const handleTicketSelect = (type) => {
    setFormData({ ...formData, vipSelection: type });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.value.trim() !== "") {
      setError("");
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.tickets.trim() || !formData.vipSelection)) {
      setError("Please select a ticket type and enter the number of tickets.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleDownload = () => {
    if (ticketRef.current) {
      html2canvas(ticketRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ticket.png";
        link.click();
      });
    }
  };

  return (
    <div className="contain">
      <div className="body">
        <div className="ticket-head">
          <h2>{getStepTitle()}</h2>
          <p>Step {step}/3</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <div className="second-body">
          {step === 1 && (
            <>
              <div className="fest">
                <h3>Techember Fest ’25</h3>
                <p>Join us for an unforgettable experience at <br /> [Event Name]! Secure your spot now.</p>
                <p className="event-location">
                  <span>📍 [Event Location] </span> || <span>March 15, 2025 | 7:00 PM</span>
                </p>
              </div>
              <hr className="line2" />
              <div className="ticket-type">
                <p>Select Ticket Type:</p>
                <div className="ticket-card">
                  <button className={`card1 ${formData.vipSelection === "Free" ? "selected" : ""}`} onClick={() => handleTicketSelect("Free")}>
                    <h6>Free</h6>
                    <p>Regular Access</p>
                    <span>20/52</span>
                  </button>
                  <button className={`card2 ${formData.vipSelection === "VIP" ? "selected" : ""}`} onClick={() => handleTicketSelect("VIP")}>
                    <h6>$150</h6>
                    <p>VIP Access</p>
                    <span>20/52</span>
                  </button>
                  <button className={`card2 ${formData.vipSelection === "VVIP" ? "selected" : ""}`} onClick={() => handleTicketSelect("VVIP")}>
                    <h6>$150</h6>
                    <p>VVIP Access</p>
                    <span>20/52</span>
                  </button>
                </div>
              </div>

              <div className="number">
                <p>Number of Tickets</p>
                <input
                  type="number"
                  name="tickets"
                  value={formData.tickets}
                  onChange={handleChange}
                />
                {error && <p className="error-message">{error}</p>}
              </div>

              <div className="ticket-button">
                <button className="button1">Cancel</button>
                <button type="submit" className="button2" onClick={nextStep}>
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="step-two">
              <UploadProfilePhoto nextStep={nextStep} setStep={setStep} error={error} setError={setError} />
            </div>
          )}

          {step === 3 && (
            <div>
              <Download ticketRef={ticketRef} />
              <div className="ticket-button">
                <button className="button1" onClick={() => setStep(1)}>Book Another Ticket</button>
                <button type="submit" className="button2" onClick={handleDownload}>Download Ticket</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
