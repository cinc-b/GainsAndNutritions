import React, { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate, useParams} from "react-router-dom";

const qrcodeId = "reader";

//
// TODO stop cam when going back without a successfull scan
// This might help: https://github.com/mebjas/html5-qrcode/issues/500#issuecomment-1214363818
//

const BarcodeScannerPluginRework = () => {
  const navigate = useNavigate();
  const {id} = useParams();



  let html5QrCode;
  useEffect(() => {
    if (!html5QrCode?.getState()) {
      // Anything in here is fired on component mount.
      html5QrCode = new Html5Qrcode(qrcodeId);
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        html5QrCode
          .stop()
          .then((ignore) => {
            console.log("Stopped");
          })
          .catch((err) => {
            console.log(err);
          });
          {id==="add" ? navigate(`/AddFoodToDatabase`, { state: { eanCodeFromCamera : decodedText}}) : navigate(`/AddFood/${id}`, { state: { eanCodeFromCamera : decodedText}})}
      };
      const config = {
        fps: 10,
        qrbox: { width: 500, height: 500 },
        aspectRatio: 1.777778,
      };

      // If you want to prefer back camera
      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      );
    }
    return () => {};
  }, []);

  return <div id={qrcodeId}></div>;
};

export default BarcodeScannerPluginRework;
