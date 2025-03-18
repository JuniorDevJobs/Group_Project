import React, {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField } from "@mui/material"
import Button from '@mui/material/Button';
export default function LoginPage() {
    const [loading, setLoading]=useState(false)
    const navigate=useNavigate()
    const handleLogin = () => {
        return (
            setLoading(true),
            console.log("logging in")
        )
    }
    const handleNewUser = () => {
        return(
            navigate("/signup")
        )
    }

    return (
        <Paper
        square={false}
        elevation={4}>

            <h3>Login</h3>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                >
                    <div>
                        <TextField
                        required
                        id="outlined-required"
                        label="Username"
                        placeholder="Enter username"
                        />
                    </div>
                    <div>
                        <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        placeholder="Enter password"
                        />
                    </div>
                    <div>
                    <Button
                        onClick={handleLogin}
                        // endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        >
                        Submit
                    </Button>
                    </div>
            </Box>
            <p> Need an account?</p>
            <Button onClick={handleNewUser}>Create an Account </Button>
        </Paper>
    )
}