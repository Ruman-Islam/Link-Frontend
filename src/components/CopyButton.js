import React, { useState } from "react";
import CopyToClipboard from "reactjs-copy-to-clipboard";

const CopyButton = ({ url }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className="link-box">
      <a target="_blank" href={url} rel="noreferrer">
        {url}
      </a>
      <br />
      <div className="copy-btn">
        <CopyToClipboard text={url} onCopy={() => setStatus(true)}>
          <button>Copy</button>
        </CopyToClipboard>
        {status && <p style={{ color: "red" }}> Copied!!!</p>}
      </div>
    </div>
  );
};

export default CopyButton;
