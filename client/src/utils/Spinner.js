import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

function Spinner(){
return (<ClipLoader
cssOverride={override}
size={150}
/>)
}

export default Spinner


