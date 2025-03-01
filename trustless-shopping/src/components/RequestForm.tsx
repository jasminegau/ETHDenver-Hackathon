import { useState } from "react";

const RequestForm = () => {
    const [item, setItem] = useState("");
    const [destination, setDestination] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Requesting: ${item} to ${destination}`);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-800 text-white rounded">
            <input
                type="text"
                placeholder="Item Name"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                className="p-2 w-full mb-2"
            />
            <input
                type="text"
                placeholder="Delivery Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="p-2 w-full mb-2"
            />
            <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
                Request Item
            </button>
        </form>
    );
};

export default RequestForm;
