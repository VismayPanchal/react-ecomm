import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logoutUser } from "../store/authSlice";
import { AppDispatch } from "../store";

const Navbar: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    console.log('usre', user)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    E-Comm
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Products
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex ms-lg-3">
                        {user ? (
                            <>
                                <span className="navbar-text me-3">Welcome, {user.email}</span>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => dispatch(logoutUser())}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/login">
                                    Login
                                </Link>
                                <Link className="btn btn-primary" to="/signup">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
