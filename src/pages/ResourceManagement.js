// ResourceManagement
import React, { cloneElement, useState, useEffect, useRef} from 'react';
import { useNavigate } from "react-router";


function HW(props){
    return(
        <h2>HWSet{props.hwset_num}:{props.availabiliy}/{props.cap} </h2>
    )
}

function HW_set({HW_set,project_id,hwset_num,avail, cap,HW_req,setHW_req,setCheckIn_,setResponseMessage}){
    // console.log('Initial avail of hw ', hwset_num, ' :', avail);

   const [availability, setavailability] = useState(avail);
    useEffect(() => {
        setavailability(avail);
    }, [avail]); // Update availability whenever avail changes
    // console.log('Initial availability of hw ', hwset_num, ' :', availability);
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
                // alert(JSON.stringify(responseData))
                setResponseMessage(JSON.stringify(responseData));
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

const Projects = () => {
    // const [HW1cap, setHW1cap] = useState("");
    // const [HW2cap, setHW2cap] = useState("");
    const [responseMessage, setResponseMessage] = useState('');

    const [HW1Availability ,setHW1Availability] = useState("0");


    const [HW1av, setHW1av] = useState("");
    const [HW2av, setHW2av] = useState("");

    const [HW1req, setHW1req] = useState("");
    const [HW2req, setHW2req] = useState("");
    const [HW3req, setHW3req] = useState("");

    const [checkIn1, setCheckIn1] = useState(true);
    const [checkIn2, setCheckIn2] = useState(true);
    const [checkIn3, setCheckIn3] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const revealAvailabilty = async () => {
            try {
                const response = await fetch('/resource_management');
                const data = await response.json();
                setHW1av(data.HW1availability);
                setHW2av(data.HW2availability);
            } catch (error) {
                console.error('Error fetching capacity:', error);
            }
        };
        // Fetch initial availability data when component mounts
        revealAvailabilty();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleLogout = () => {
        // Add any logout logic here if needed
        navigate('/');
      }

    return (
        <div className="auth-form-container">
            <h1>ECE461L: Resource Management</h1>
            <button style={{position: 'absolute', top: '10px', right: '10px', width: '100px'}} onClick={handleLogout}>Logout</button>
            {/* <button onClick={revealAvailabilty}>Please Press Here to Reveal Initial Capacity, this is a known issue</button> */}
            {/* Project 1 */}
            <div className='resource-container'>
                <form className="resource-section">
                    <h2>Project Name 1</h2>
                    {/* <button onClick={handleClick1}>{button1Text}</button> */}
                </form>
                <div className="resource-section">
                    <HW_set project_id="1" hwset_num="1" avail={HW1av} cap="165" HW_req={HW1req} setHW_req={setHW1req}
                            setCheckIn_={setCheckIn1} setResponseMessage={setResponseMessage}/>
                    <HW_set project_id="1" hwset_num="2" avail={HW2av} cap="150" HW_req={HW2req} setHW_req={setHW2req}
                            setCheckIn_={setCheckIn2} setResponseMessage={setResponseMessage}/>
                </div>
                
            </div>
            <div>{responseMessage}</div>
        </div>
    );
}

export default Projects;

