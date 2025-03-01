import Navbar from "../components/Navbar";
import RequestForm from "../components/RequestForm";
import OrderList from "../components/OrderList";
import EscrowCard from "../components/EscrowCard";
import Profile from "../components/Profile";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-6">
                <h2 className="text-2xl font-semibold mb-4">Your Requests</h2>
                <RequestForm />
                <OrderList />
                <Profile />
                <EscrowCard />
            </div>
        </div>
    );
};

export default Dashboard;
