import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"
import { deleteUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [open, setOpen]=useState (false)
    const [email, setEmail]=useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const navigate = useNavigate()
    if (!username){
        return "Login to view profile"
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // add updateUser function
        console.log("New Email:", email);
        setOpen(false);
    };


    const handleDeleteOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
        const userToken = localStorage.getItem("access")
        const context = {"user": userToken}
        const response = await deleteUser(context, userToken)

        return (
            {response}
        )
    }
    return (
        <>
        <div>
        <Avatar sx ={{background: "teal"}}>
        {username.charAt(0).toUpperCase()}
        </Avatar> {username}
        </div>
        <br/>

        <Button variant="contained" onClick={handleOpen}>Update Contact</Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Email</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <br/>
            <br/>
            <Button
            sx={{background: "red"}} onClick={handleDeleteOpen}>Delete Account</Button>
            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete your account? This action is irreversible.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="secondary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}