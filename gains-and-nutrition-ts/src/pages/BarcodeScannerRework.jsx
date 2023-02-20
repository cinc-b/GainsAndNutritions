import BarcodeScannerPluginRework from "../components/BarcodeScannerPluginRework";

import { useNavigate} from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BarcodeScannerRework = () => {
    const navigate = useNavigate();

  return (
    <div className="BarcodeScannerRework">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate(-1);
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">Barcode scanning...</div>
      </header>
      <div className="BarcodeScannerReworkPlugin">
        <BarcodeScannerPluginRework/>
      </div>
    </div>
  );
};

export default BarcodeScannerRework;
