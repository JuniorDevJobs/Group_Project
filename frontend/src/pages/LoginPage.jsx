import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField, Typography, Alert } from "@mui/material";
import Button from '@mui/material/Button';
import { login } from "../api/Authapi";
import UserContext from "../context/UserContext";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const {setLoggedIn} = useContext(UserContext)
    const [error, setError]=useState("")
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userInfo = await login(formData);
            // console.log(userInfo)
            if (userInfo.detail) {
                setError("No account with those credentials. Try Again")
                setLoading(false)
                return
            }
            
            localStorage.setItem("access", userInfo.access);
            localStorage.setItem("refresh", userInfo.refresh);
            localStorage.setItem("username", formData.username);
            localStorage.setItem("email",userInfo.email)
            localStorage.setItem("userData", JSON.stringify({
                username: formData.username,
                email: userInfo.email || "",
                preferences: userInfo.preferences || {},
                savedJobs: userInfo.saved_jobs || []
            }));

            if (userInfo) {
                setLoggedIn(true)
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
            setLoading(false); 
        }
    };

    const handleNewUser = () => {
        navigate("/signup");
    };

    return (
        <Paper square={false} elevation={4}>
            <Typography sx={{fontSize: 25, fontFamily: "Impact", } }>Login </Typography>
            {error && (
            <Alert severity="error" sx={{color:"black"}}>{error}</Alert>)}

            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
            >
                <div>
                    <TextField
                        required
                        id="username"
                        name="username"
                        value={formData.username}
                        label="Username"
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="password"
                        name="password"
                        value={formData.password}
                        label="Password"
                        placeholder="Enter password"
                        type="password" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{backgroundColor: "#44BBA4" }}
                    >
                        {loading ? "Logging in..." : "Submit"}
                    </Button>
                </div>
            </Box>
            <p>Need an account?</p>
            <Button sx={{marginBottom: 2, backgroundColor: "#bc6de5", opacity: .8}}variant="contained" onClick={handleNewUser}>Create an Account</Button>
        </Paper>
    );
}