import React, { useState } from 'react';

const ResourceManagement = () => {

    const [HW1cap, setHW1cap] = useState("");
    const [HW2cap, setHW2cap] = useState("");
    
    const [HW1av, setHW1av] = useState("");
    const [HW2av, setHW2av] = useState("");

    const [HW1req, setHW1req] = useState("");
    const [HW2req, setHW2req] = useState("");

    return (
        <div className="auth-form-container">
            <h1>ECE461L: Resource Management</h1>
                <div className='resource-container'>
                    { /* will probably need to change as these are set values? */}
                    <form className="resource-section">
                    <h2>Capacity</h2>
                        <input value = {HW1cap} onChange={(e) => setHW1cap(e.target.value)} type="text" id="HW1cap" name="HW1cap"/>
                        <input value = {HW2cap} onChange={(e) => setHW2cap(e.target.value)} type="text" id="HW2cap" name="HW2cap"/>
                    </form>

                    { /* will probably need to change as these are set values? */}
                    <form className="resource-section">
                    <h2>Availability</h2>
                        <input value = {HW1av} onChange={(e) => setHW1av(e.target.value)} type="text" id="HW1av" name="HW1av"/>
                        <input value = {HW2av} onChange={(e) => setHW2av(e.target.value)} type="text" id="HW2av" name="HW2av"/>
                    </form>

                    { /* will probably need to change as these are set values? */}
                    <form className="resource-section">
                    <h2>Request</h2>
                        <input value = {HW1req} onChange={(e) => setHW1req(e.target.value)} type="text" id="HW1req" name="HW1req"/>
                        <input value = {HW2req} onChange={(e) => setHW2req(e.target.value)} type="text" id="HW2req" name="HW2req"/>
                        <div className="button-container">
                            <button>check-in</button>
                            <button>check-out</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default ResourceManagement;
