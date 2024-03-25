import React, { useState } from 'react';
import EnterQtyBox from './components/EnterQtyBox';
import CheckInBox from './components/CheckInBox';
import CheckOutBox from './components/CheckOutBox'

const ResourceManagement = () => {

    // State variables to store entered quantities for HWSet1 and HWSet2
    const [enteredQty1, setEnteredQty1] = useState(0);
    const [enteredQty2, setEnteredQty2] = useState(0);
    
    const [qty1, setQty1] = useState(0);
    const [qty2, setQty2] = useState(0);
    
    const handleQtyChange1 = (newQty) => {
        setEnteredQty1(newQty);
    };

    const handleQtyChange2 = (newQty) => {
        setEnteredQty2(newQty);
    };

    // handlers for checking in and out HWSet1
    const handleCheckIn1 = () => {
        if(qty1+ enteredQty1 <= 100){
            setQty1(prevQty => prevQty + enteredQty1);
        } else {
            // Optionally, you can show a message or handle this case in another way
            console.log('Cannot check in. Capacity exceeded.');
        }
    };

    const handleCheckOut1 = () => {
        if(qty1 - enteredQty1 >= 0){
            setQty1(prevQty => prevQty - enteredQty1);
        } else {
            // Optionally, you can show a message or handle this case in another way
            console.log('Cannot check out. Capacity exceeded.');
        }
    };

    // handlers for checking in and out HWSet2
    const handleCheckIn2 = () => {
        if(qty2+ enteredQty2 <= 100){
            setQty2(prevQty => prevQty + enteredQty2);
        } else {
            // Optionally, you can show a message or handle this case in another way
            console.log('Cannot check in. Capacity exceeded.');
        }
    };
    const handleCheckOut2 = () => {
        if(qty2 - enteredQty2 >= 0){
            setQty2(prevQty => prevQty - enteredQty2);
        } else {
            // Optionally, you can show a message or handle this case in another way
            console.log('Cannot check out. Capacity exceeded.');
        }
    };

    return (
        <div className="auth-form-container">
            <h1>ECE461L: Resource Management</h1>
            <h2>Project Name (Here Temporarily)</h2>
        

            <div className="resource-container">
                <div>
                    <h2>HWSet1: {qty1}/100</h2>
                    <h2>HWSet2: {qty2}/100 </h2>
                </div>

                <div >
                    <EnterQtyBox initialQty={0} onQtyChange={handleQtyChange1} />
                    <EnterQtyBox initialQty={0} onQtyChange={handleQtyChange2} />
                </div>

                <div >
                    <CheckInBox onCheckIn={handleCheckIn1} />
                    <CheckInBox onCheckIn={handleCheckIn2} />
                </div>

                <div>
                    <CheckOutBox onCheckOut={handleCheckOut1} />
                    <CheckOutBox onCheckOut={handleCheckOut2} />
                </div>
            </div>


        </div>
    );
}

export default ResourceManagement;
