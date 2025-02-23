import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";

const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = (data: any) => {
        console.log(errors)

        dispatch(registerUser(data));
        navigate("/login");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("username", { required: "Name is required" })}
                        />

                        {/* {errors.name && <small className="text-danger">{errors.name.message}</small>} */}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            {...register("email", { required: "Email is required" })}
                        />

                        {/* {errors.email && <small className="text-danger">{errors.email.message}</small>} */}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                        />

                        {/* {errors.password && <small className="text-danger">{errors.password.message}</small>} */}
                    </div>

                    <button type="submit" className="btn btn-success w-100">Sign Up</button>
                </form>

                <div className="text-center mt-3">
                    <p>Already have an account? <a href="/login" className="text-primary">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
