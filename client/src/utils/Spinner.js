import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = CSSProperties = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

<ClipLoader
color={color}
loading={loading}
cssOverride={override}
size={150}
aria-label="Loading Spinner"
data-testid="loader"
/>

export default ClipLoader



