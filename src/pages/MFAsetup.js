import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import qrcode from "qrcode";
import './MFAsetup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const MFASetup = () => {
    const [qrdata, setQrdata] = useState("http://localhost:3001");
    const [otpauth, setOtpauth] = useState();
    const [secret, setSecret] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/auth/mfa/mfasetup", { withCredentials: true })
            .then(result => {
                if (result.data.success) {
                    setQrdata(result.data.imageUrl);

                    setSecret(result.data.key);
                    console.log(result.data.imageUrl);
                }
                else {
                    console.log(qrdata);
                }

            })
    }, [navigate])


    const handlecompletesetup = () => {
        axios.post("http://localhost:3001/auth/mfa/mfaregister", { secret }, { withCredentials: true })
            .then(result => {
                if (result.data.success) {
                    alert("You have successfully setup MFa")
                    navigate('/home')
                }
                else {
                    alert("An error Occured. Please try again");
                    navigate('/home');
                }

            })
    }

    // useEffect(() => {

    //     setQrdata(qrcode.toDataURL(otpauth));


    // }, [otpauth]);



    return (
        <div className="auth-container">
            <h2>Set Up MFA</h2>
            <p>
                Enhance your account security by setting up Multi-Factor Authentication
                (MFA). Use an authenticator app to scan the QR code below or manually
                enter the secret key.
            </p>
            <div className="qr-container">
                <QRCodeCanvas value={qrdata} size={200} />
            </div>
            {/* <div className="secret-container">
                <label>Secret Key:</label>
                <div className="secret-key">{secret}</div>
            </div> */}
            <p>
                Follow these steps to set up MFA:
                <ol>
                    <li>Download an authenticator app (e.g., Google Authenticator, Authy).</li>
                    <li>Open the app and select "Add Account" or "+" icon.</li>
                    <li>Scan the QR code or manually enter the secret key.</li>
                    <li>Enter the generated code to complete the setup.</li>
                </ol>
            </p>
            <button onClick={handlecompletesetup} className="mfa-complete-button">Complete Setup</button>
            <p>
                <Link to="/home">Skip for now</Link>
            </p>
        </div>
    );
};

export default MFASetup;
