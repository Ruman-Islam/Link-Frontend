import React, { useEffect, useState } from "react";
import CopyButton from "../components/CopyButton";
import icon from "../assets/images/generate.png";
import menu from "../assets/images/menuicon.png";
import TargetChart from "../components/TargetChart";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Data will be lost if you leave the page, are you sure?";
    };
  }, []);

  const generate_url = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    formData.amount = +formData.amount;
    const { amount, name, vpa_upi, pm } = formData;
    if (
      !amount ||
      isNaN(amount) ||
      name === " " ||
      vpa_upi === " " ||
      pm === " "
    ) {
      setError("Whitespace or zero not accepted");
    } else {
      if (pm.includes(" ")) {
        const splittedPm = pm.split(" ");
        const payment_method = splittedPm[0] + "_" + splittedPm[1];
        formData.pm = payment_method;
      }
      setLoading(true);
      setError("");
      const url = "https://link-black.vercel.app/api/v1/admin/url";
      // const url = 'http://localhost:5000/api/v1/admin/url';
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then(({ url }) => {
          setLoading(false);
          setUrl(url);
        })
        .catch((err) => {
          setError("Please try again!");
          setLoading(false);
        });
    }
  };

  return (
    <main className="main-body">
      <div className="main-container">
        <div className="analytics">
          <div className="analytics-header">
            <div>
              <img src={menu} alt="" />
            </div>
            <div>
              <h1>Analytics</h1>
              <small>(Under construction)</small>
            </div>
          </div>
          <div className="analytics-body">
            <div className="analytics-body-left">
              <div className="analytics-stats-box">
                <small>Users</small>
                <p>45.5M</p>
              </div>
              <div className="analytics-stats-box">
                <small>Conversion</small>
                <p>432.1M</p>
                <TargetChart />
              </div>
            </div>
            <div className="analytics-body-right"></div>
          </div>
        </div>
        <div className="form-container">
          <form onSubmit={(e) => generate_url(e)} className="my-form">
            <div className="container">
              <h1>Get in touch!</h1>
              <ul>
                <li>
                  <div className="grid grid-2">
                    <input
                      type="text"
                      placeholder="Amount"
                      name="amount"
                      required
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                      autoComplete="off"
                    />
                  </div>
                </li>
                <li>
                  <div className="grid grid-2">
                    <input
                      type="text"
                      placeholder="VPA/UPI"
                      name="vpa_upi"
                      required
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      placeholder="Method"
                      name="pm"
                      required
                      autoComplete="off"
                    />
                    {/* <select name="payment_method">
                      <option disabled>-- Choose a method --</option>
                      <option value="Cash Planet">Cash Planet</option>
                      <option value="Kistloan Payment">Kistloan Payment</option>
                      <option value="RupeeStar">RupeeStar</option>
                    </select> */}
                  </div>
                </li>
                <li>
                  <textarea
                    defaultValue={url}
                    placeholder="Link will be shown here"
                    readonly='readonly'
                  ></textarea>
                </li>

                <li>
                  <div className="grid grid-2">
                    <div className="loading-box">
                      {error && <p className="error-msg">{error}</p>}
                      {loading && <div className="loader"></div>}
                      {loading && <span>Loading...</span>}
                    </div>
                    <button className="btn-grid" type="submit" disabled={url}>
                      <span className="back">
                        <img src={icon} alt="" />
                      </span>
                      <span className="front">GENERATE</span>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </form>
          {url && <CopyButton url={url} />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
