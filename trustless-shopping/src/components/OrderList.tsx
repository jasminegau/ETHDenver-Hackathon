const orders = [
    { id: 1, item: "Nike Shoes", status: "Pending" },
    { id: 2, item: "iPhone 15", status: "Delivered" },
];

const OrderList = () => {
    return (
        <div className="mt-4">
            {orders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-700 text-white rounded mb-2">
                    <p>{order.item}</p>
                    <p>Status: {order.status}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderList;
