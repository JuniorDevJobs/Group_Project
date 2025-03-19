import React, {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField } from "@mui/material"
import Button from '@mui/material/Button';
import { signup } from "../api/Authapi";
export default function SignUp () {
    const [loading, setLoading]=useState(false)
    const [formData, setFormData] =useState({username:"", password:"", email: ""})
    const navigate = useNavigate()

    const handleNavigate = () => {
       navigate("/login")
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        // setLoading(true)
        const userInfo = await signup(formData)
        if (userInfo) {
            navigate("/login")
        } else {
            console.error("Failed Logging in")
        }
    }

    return (
        <Paper
        square={false}
        elevation={4}>

            <h3>SignUp</h3>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSignUp}
                >
                        <div>
                            <TextField
                            required
                            id="username"
                            label="Username"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                            required
                            id="password"
                            label="Password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            name="email"
                            placeholder="Enter Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                        <Button
                        type="submit"
                            onClick={handleSignUp}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            >
                            Submit
                        </Button>
                        </div>
                    <p> Have an account?</p>
            <Button onClick={handleNavigate}> Sign In </Button>
            </Box>
        </Paper>
    )
}