import React, { useState } from "react";
import CopyToClipboard from "reactjs-copy-to-clipboard";

const CopyButton = ({ url }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className="link-box">
      <div className="copy-btn">
        <CopyToClipboard text={url} onCopy={() => setStatus(true)}>
          <button>Copy</button>
        </CopyToClipboard>
        {status && <small>copied!</small>}
      </div>
    </div>
  );
};

export default CopyButton;
