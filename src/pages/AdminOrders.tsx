import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchOrders, updateOrderStatus } from "../store/orderSlice";

const AdminOrders: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, loading, error } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleStatusChange = (orderId: number, newStatus: string) => {
        dispatch(updateOrderStatus({ orderId, status: newStatus }));
    };

    return (
        <div className="container mt-4">
            <h2>Manage Orders</h2>
            {loading && <div className="alert alert-info">Loading orders...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Customer</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: any, index: number) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.customerName}</td>
                                <td>${order.total}</td>
                                <td>
                                    <span className={`badge ${order.status === "Pending" ? "bg-warning" : "bg-success"}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="form-select"
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        value={order.status}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
