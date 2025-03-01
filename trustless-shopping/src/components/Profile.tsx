import { useState } from "react";

const Profile = () => {
    const [verified, setVerified] = useState(false);

    const verifyCredential = async () => {
        alert("Verifying Humanity Protocol credential...");
        setVerified(true);
    };

    return (
        <div className="p-4 bg-gray-900 text-white rounded">
            <h2 className="text-xl font-bold mb-2">Humanity Protocol Credential</h2>
            <p>Status: {verified ? "Verified" : "Not Verified"}</p>

            <button onClick={verifyCredential} className="bg-blue-500 px-4 py-2 rounded mt-2">
                Verify Credential
            </button>
        </div>
    );
};

export default Profile;
