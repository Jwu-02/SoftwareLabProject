// ResourceManagement
import React, { cloneElement, useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router";

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

    const navigate = useNavigate();

    const [isCapacityRevealed, setIsCapacityRevealed] = useState(false); // Track whether capacity is revealed

    const revealCapacity = async () => {
        try {
            const response = await fetch('/resource_management');
            const data = await response.json();
            setHW1cap(data.HW1availability);
            setHW2cap(data.HW2availability);
            setIsCapacityRevealed(true);
        } catch (error) {
            console.error('Error fetching capacity:', error);
        }
    };



    const handleClick1 = () => {
        if (button1Text === "Join") {
            setButton1Text("Leave");
        } else {
            setButton1Text("Join");
        }
    };

    const handleLogout = () => {
        // Add any logout logic here if needed
        navigate('/');
      }

    const handleClick2 = () => {
        setButton2Text(button2Text === "Join" ? "Leave" : "Join");
    };
    const handleClick3 = () => {
        setButton3Text(button3Text === "Join" ? "Leave" : "Join");
    };

    return (
        <div className="auth-form-container">
            <h1>ECE461L: Resource Management</h1>
            <button style={{position: 'absolute', top: '10px', right: '10px', width: '100px'}} onClick={handleLogout}>Logout</button>
            <button onClick={revealCapacity}>Please Press Here to Reveal Initial Capacity, this is a known issue</button>
            {/* Project 1 */}
            <div className='resource-container'>
                <form className="resource-section">
                    <h2>Project Name 1</h2>
                    <button onClick={handleClick1}>{button1Text}</button>
                </form>
                <div className="resource-section">
                    <HW_set project_id="1" hwset_num="1" cap="165" HW_req={HW1req} setHW_req={setHW1req}
                            setCheckIn_={setCheckIn1}/>
                    <HW_set project_id="1" hwset_num="2" cap="150" HW_req={HW2req} setHW_req={setHW2req}
                            setCheckIn_={setCheckIn2}/>
                    {/* Conditionally render capacity */}
                    {isCapacityRevealed && (
                        <div>
                            <p>HW1 Initial Capacity: {HW1cap}</p>
                            <p>HW2 Initial Capacity: {HW2cap}</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Projects;


///SEPARATION

// import React, { useState, useEffect } from 'react';
//
// // Component for displaying hardware information
// function HW(props) {
//     return (
//         <h2>HWSet{props.hwset_num}:{props.availability}/{props.cap}</h2>
//     )
// }
//
// // Component for handling hardware check in/out
// function HW_set({ project_id, hwset_num, cap, availability, setavailability }) {
//     const [HW_req, setHW_req] = useState("");
//
//     // Function to handle hardware check in/out
//     const handleCheckInOut = async (checkIn) => {
//         try {
//             const response = await fetch(checkIn ? '/check_in_hardware' : '/check_out_hardware', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     projectId: project_id,
//                     qty: HW_req,
//                     hwID: hwset_num
//                 }),
//             })
//             const responseData = await response.json();
//             setavailability(responseData.new_avail);
//             alert(JSON.stringify(responseData));
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }
//
//     return (
//         <div className='resource-container'>
//             <form className="resource-section">
//                 <h2>HWSet{hwset_num}:{availability}/{cap}</h2>
//             </form>
//             <form className="resource-section">
//                 <input value={HW_req} onChange={(e) => setHW_req(e.target.value)} type="text" id={HW_req} name={HW_req} placeholder="Enter Qty" />
//             </form>
//             <form className="resource-section">
//                 <div className="button-container">
//                     <button onClick={() => handleCheckInOut(true)}>Check In</button>
//                 </div>
//             </form>
//             <form className="resource-section">
//                 <div className="button-container">
//                     <button onClick={() => handleCheckInOut(false)}>Check Out</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
//
// // Main component
// function Projects() {
//     const [HW1availability, setHW1availability] = useState(); // Initial availability for HW1
//     const [HW2availability, setHW2availability] = useState(); // Initial availability for HW2
//
//     useEffect(() => {
//         // Fetch initial availability data
//         async function getResponse() {
//             try {
//                 const response = await fetch('/resource_management', { // Change it later
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 })
//                 const responseData = await response.json();
//                 console.log(responseData);
//                 setHW1availability(responseData.HW1availability);
//                 setHW2availability(responseData.HW2availability);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         }
//         getResponse();
//     }, []);
//
//     return (
//         <div className="auth-form-container">
//             <h1>ECE461L: Resource Management</h1>
//             <div className='resource-container'>
//                 <form className="resource-section">
//                     <h2>Project Name 1</h2>
//                 </form>
//                 <div className="resource-section">
//                     <HW_set project_id="1" hwset_num="1" cap="165" availability={HW1availability} setavailability={setHW1availability} />
//                     <HW_set project_id="1" hwset_num="2" cap="150" availability={HW2availability} setavailability={setHW2availability} />
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default Projects;
