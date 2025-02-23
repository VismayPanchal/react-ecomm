import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";


const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        dispatch(loginUser({ username: data.username, password: data.password }))
            .unwrap()
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Login failed:", error);
            });
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">User name</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("username", { required: "Username is required" })}
                        />

                        {/* {errors.email && <small className="text-danger">{errors.email.message}</small>} */}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("password", { required: "Password is required" })}
                        />

                        {/* {errors.password && <small className="text-danger">{errors.password.message}</small>} */}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <div className="text-center mt-3">
                    <p>Don't have an account? <a href="/signup" className="text-primary">Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
