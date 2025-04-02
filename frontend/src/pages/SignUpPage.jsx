import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { signup } from "../api/Authapi";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });
    const [errors, setErrors] = useState({ username: "", password: "", email: "" });
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        // Validate field on change
        validateField(e.target.name, e.target.value);
    };

    const validateField = (name, value) => {
        let errorMsg = "";
        if (name === "password") {
            if (value.length < 8) {
                errorMsg = "Password must be at least 8 characters.";
            }
        } else if (name === "email") {
            if (!value.includes("@")) {
                errorMsg = "Email must contain an @ symbol.";
            }
        }else if (name === "username") {
            if (value.length < 4) {
                errorMsg = "Username must be atleast 4 characters";
            }}
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        }
        if (!formData.email.includes("@")) {
            newErrors.email = "Email must contain an @ symbol.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const userInfo = await signup(formData);
            if (userInfo) {
                navigate("/login");
            } else {
                console.error("Failed Signing up");
            }
        } catch (error) {
            console.error("Error during signup:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper square={false} elevation={4}>
            <Typography sx={{fontSize: 25, fontFamily: "Impact", } }> Sign Up</Typography>
            <Box component="form" sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }} noValidate autoComplete="off" onSubmit={handleSignUp}>
                <div>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        name="username"
                        placeholder="Enter username"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="email"
                        label="Email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </div>
                <div>
                    <Button sx={{backgroundColor: "#44BBA4" }} type="submit" variant="contained" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </div>
                <p> Already have an account?</p>
                <Button sx={{marginBottom: 2, backgroundColor: "#bc6de5", opacity: .8}}variant="contained" onClick={handleNavigate}> Log in Here </Button>
            </Box>
        </Paper>
    );
}