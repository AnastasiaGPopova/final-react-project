import RingLoader  from "react-spinners/RingLoader";

const override = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "transperant" };

function Spinner(){
return (
    
<RingLoader 
color="#ffffff" 
cssOverride={override}
size={150}
/>
)
}

export default Spinner


