import React, {useState} from "react"
import { useNavigate } from 'react-router-dom';
import { Paper, Box, TextField } from "@mui/material"
import Button from '@mui/material/Button';
export default function SignUp () {
    const [loading, setLoading]=useState(false)
    const navigate = useNavigate()

    const handleNavigate = () => {
       navigate("/login")
    }

    const handleSignUp = () => {
        setLoading(true)
        console.log("signing up new user")
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