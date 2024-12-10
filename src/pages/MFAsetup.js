import React, { useEffect, useState } from "react";
//import QRCodeCanvas from "qrcode.react";
import './MFAsetup.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const MFASetup = () => {
    const [secret, setSecret] = useState("JBSWY3DPEHPK3PXP"); // Replace with dynamic generation logic if needed
    const navigate = useNavigate();
    // QR Code Data
    const qrCodeData = `otpauth://totp/MyApp:${encodeURIComponent(
        "user@example.com"
    )}?secret=${secret}&issuer=MyApp`;

    useEffect(() => {
        axios.get("http:localhost:3001/auth/mfa/mfasetup", { withCredentials: true })
            .then(result => {
                if (result.data.success) {

                }

            })
    }, [navigate])

    return (
        <div className="auth-container">
            <h2>Set Up MFA</h2>
            <p>
                Enhance your account security by setting up Multi-Factor Authentication
                (MFA). Use an authenticator app to scan the QR code below or manually
                enter the secret key.
            </p>
            {/* <div className="qr-container">
                <QRCodeCanvas value={qrCodeData} size={200} />
            </div> */}
            <div className="secret-container">
                <label>Secret Key:</label>
                <div className="secret-key">{secret}</div>
            </div>
            <p>
                Follow these steps to set up MFA:
                <ol>
                    <li>Download an authenticator app (e.g., Google Authenticator, Authy).</li>
                    <li>Open the app and select "Add Account" or "+" icon.</li>
                    <li>Scan the QR code or manually enter the secret key.</li>
                    <li>Enter the generated code to complete the setup.</li>
                </ol>
            </p>
            <button className="mfa-complete-button">Complete Setup</button>
            <p>
                <Link to="/home">Skip for now</Link>
            </p>
        </div>
    );
};

export default MFASetup;
