import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchOrders } from "../store/orderSlice";

const OrderHistory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, loading, error } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders()); // Fetch orders on component mount
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Order History</h2>
            {loading && <div className="alert alert-info">Loading orders...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {orders.length === 0 ? (
                <div className="alert alert-info text-center">No previous orders found.</div>
            ) : (
                <div className="row">
                    {orders.map((order: any) => (
                        <div key={order.id} className="col-md-6">
                            <div className="card mb-3 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Order #{order.id}</h5>
                                    <p className="card-text">
                                        <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                                    </p>
                                    <p className="card-text">
                                        <strong>Total:</strong> ${order.total?.toFixed(2)}
                                    </p>
                                    <p className="card-text">
                                        <strong>Status:</strong> {order.status}
                                    </p>
                                    <ul className="list-group list-group-flush">
                                        {order.items.map((item: any) => (
                                            <li key={item.id} className="list-group-item">
                                                {item.title} - ${item.price} x {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
