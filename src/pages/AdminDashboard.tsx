import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchProducts } from "../store/productSlice";
import { fetchOrders } from "../store/orderSlice";

const AdminDashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: products } = useSelector((state: RootState) => state.products);
    const { orders } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchOrders());
    }, [dispatch]);

    return (
        <div className="container mt-4">
            <h2>Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Total Products</div>
                        <div className="card-body">
                            <h3 className="card-title">{products.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Total Orders</div>
                        <div className="card-body">
                            <h3 className="card-title">{orders.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-header">Pending Orders</div>
                        <div className="card-body">
                            <h3 className="card-title">{orders.filter((order: any) => order.status === "Pending").length}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
