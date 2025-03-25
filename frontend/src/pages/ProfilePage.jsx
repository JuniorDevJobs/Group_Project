import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useContext, useState } from "react"
import { deleteUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { updateUser } from "../api/usersApi";
export default function Profile() {
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [open, setOpen]=useState (false)
    const [email, setEmail]=useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [error, setError]=useState("")
    const {loggedin, setLoggedIn} = useContext(UserContext)
    const token = localStorage.getItem("access");

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

    const handleSave = async (e) => {
        e.preventDefault()
        if (!email) {
            setError("Must provide new email to update")
            return
        }
        const context = {"email": email}
        const response = await updateUser(context, token)
        setOpen(false);
        setError("")
        alert(response.message)
    };


    const handleDeleteOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
    
        try {
            // Call deleteUser function
            const response = await deleteUser(token);
            
            // Notify the user and navigate after successful deletion
            localStorage.clear()
            setLoggedIn(false)
            alert(response); // You can replace alert with a proper UI notification
            navigate("/"); // Navigate to home after successful deletion
        } catch (error) {
            console.error("Error deleting user", error);
            // You can handle errors here, if any occur
        }
    };
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
                    {error}
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