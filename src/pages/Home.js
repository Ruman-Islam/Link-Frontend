import React, { useState } from "react";
import CopyButton from "../components/CopyButton";
import "../styles/Home.css";

const Home = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate_url = (e) => {
    setLoading(!loading);
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Object.fromEntries(data);
    const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    formData.uid = uid;
    const url =
      "https://link-black.vercel.app/cashplanetpat5670/api/v1/admin/url";
    // const { amount, name, VPA_UPI, payment_method } = formProps;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        let url;
        if (formData?.payment_method === "Cash Planet") {
          url = `https://link-black.vercel.app/cashplanetpat5670/api/v1/admin/specific_url?uid=${data?.data?.uid}`;
        } else {
          url = `https://link-black.vercel.app/kistloanpayment14980/api/v1/admin/specific_url?uid=${data?.data?.uid}`;
        }
        setUrl(url);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="main">
      <div className="main-container">
        <form onSubmit={(e) => generate_url(e)} className="input-box-container">
          <div className="blue-header">
            <p>Input Amount and Bank Account information</p>
          </div>
          <br />
          <div className="input-box">
            <label>Amount:</label>
            <input type="number" name="amount" />
          </div>
          <div className="input-box">
            <label>Name:</label>
            <input type="text" name="name" />
          </div>
          <div className="input-box">
            <label>VPA/UPI:</label>
            <input type="text" name="vpa_upi" />
          </div>
          <div className="input-box">
            <label htmlFor="payment-method">Select method:</label>
            <select id="payment-method" name="payment_method">
              <option value="Cash Planet">Cash Planet</option>
              <option value="Kistloan Payment">Kistloan Payment</option>
            </select>
          </div>
          <div className="input-box">
            <input className="generate-button" type="submit" value="Generate" />
          </div>
        </form>
        <br />
        {loading && <div className="loader"></div>}
        {url && <CopyButton url={url} />}
      </div>
    </div>
  );
};

export default Home;
