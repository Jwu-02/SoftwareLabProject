// ResourceManagement
import React, { cloneElement, useState, useEffect, useRef} from 'react';

function HW(props){
    return(
        <h2>HWSet{props.hwset_num}:{props.availabiliy}/{props.cap} </h2>
    )
}

function HW_set({HW_set,project_id,hwset_num,cap,HW_req,setHW_req,setCheckIn_}){

   const [availability, setavailability] = useState();
    const handleCheckInOut = async (checkIn) => {

        try{
            const response = await fetch(checkIn ? '/check_in_hardware' : '/check_out_hardware',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectId:project_id, // Assuming projectId corresponds to hardware set number
                    qty: HW_req,
                    hwID: hwset_num
                }),
            })
            const responseData = await response.json();
                alert(JSON.stringify(responseData))
            setavailability(responseData.new_avail)

        }catch (error) {
            console.error('Error:', error);
        }
    }

    return(
        <div className='resource-container'>
            <form className="resource-section">
                <h2>HWSet{hwset_num}:{availability}/{cap} </h2>
            </form>
            <from className="resource-section">
                <input value = {HW_req} onChange={(e) => setHW_req(e.target.value)} type="text" id={HW_req} name={HW_req} placeholder="Enter Qty"/>
            </from>
            <from className="resource-section">
                <div className="button-container">
                    {/* <button onClick={() => setCheckIn_(true)}>Check In</button> */}
                    <button onClick={() => handleCheckInOut(true)}>Check In</button>
                </div>
            </from>
            <from className="resource-section">
                <div className="button-container">
                    {/* <button onClick={() => setCheckIn_(false)}>Check Out</button> */}
                    <button onClick={() => handleCheckInOut(false)}>Check Out</button>
                </div>
            </from>


        </div>
    )
}
function ButtonCheckIn_Out ({setCheckIn}){
    return(
        <div className="button-container">
            <button onClick={() => setCheckIn(true)}>Check In</button>
            <button onClick={() => setCheckIn(false)}>Check Out</button>
        </div>

    )
}

const Projects = () => {
    const [HW1cap, setHW1cap] = useState("");
    const [HW2cap, setHW2cap] = useState("");

    const [HW1Availability ,setHW1Availability] = useState("0");


    const [HW1av, setHW1av] = useState("");
    const [HW2av, setHW2av] = useState("");

    const [HW1req, setHW1req] = useState("");
    const [HW2req, setHW2req] = useState("");
    const [HW3req, setHW3req] = useState("");

    const [checkIn1, setCheckIn1] = useState(true);
    const [checkIn2, setCheckIn2] = useState(true);
    const [checkIn3, setCheckIn3] = useState(true);

    const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);

    const [button1Text, setButton1Text] = useState("Join");
    const [button2Text, setButton2Text] = useState("Leave");
    const [button3Text, setButton3Text] = useState("Join");

    const handleClick1 = () => {
        if (button1Text === "Join") {
            setButton1Text("Leave");
        } else {
            setButton1Text("Join");
        }
    };

    const handleClick2 = () => {
        setButton2Text(button2Text === "Join" ? "Leave" : "Join");
    };
    const handleClick3 = () => {
        setButton3Text(button3Text === "Join" ? "Leave" : "Join");
    };

    return (
        <div className="auth-form-container">
            <h1>ECE461L: Resource Management</h1>
                {/* Project 1 */}
                <div className='resource-container'>
                    <form className="resource-section">
                        <h2>Project Name 1</h2>
                        <button onClick={handleClick1}>{button1Text}</button>
                    </form>
                    <div className="resource-section">
                        <HW_set project_id="1" hwset_num="1" cap="100" HW_req={HW1req} setHW_req={setHW1req} setCheckIn_={setCheckIn1} />
                        <HW_set project_id="1" hwset_num="2" cap="100" HW_req={HW2req} setHW_req={setHW2req} setCheckIn_={setCheckIn2} />

                    </div>
                </div>



        </div>
    );
}

export default Projects;
