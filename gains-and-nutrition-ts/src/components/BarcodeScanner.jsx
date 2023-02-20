import React, { useCallback } from "react";
import BarcodeScannerPlugin from "./BarcodeScannerPlugin";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BarcodeScanner = () => {
  const navigate = useNavigate();

  const memoizedHandleClick = useCallback(
    (decodedText, decodedResult) => {
      console.log(decodedText);
      console.log(decodedResult);
      navigate(-1);
    },
    [] // Tells React to memoize regardless of arguments.
  );
  return (
    <div className="BarcodeScanner">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate(-1);
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">Barcode scanning...</div>
      </header>
      <div className="BarcodeScannerPlugin">
        <BarcodeScannerPlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={memoizedHandleClick}
          aspectRatio={1}
        />
      </div>
    </div>
  );
};

export default BarcodeScanner;
