import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card, CardContent, CardActions, Typography, Alert } from "@mui/material";
import { useContext, useState } from "react"
import { deleteUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { updateUser } from "../api/usersApi";
export default function Profile() {
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [open, setOpen]=useState (false)
    const [email, setEmail]=useState(localStorage.getItem("email"))
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [error, setError]=useState("")
    const {loggedin, setLoggedIn} = useContext(UserContext)
    const token = localStorage.getItem("access");
    const [alertMessage, setAlertMessage] = useState(null)
    const userData = JSON.parse(localStorage.getItem("userData"))

    const navigate = useNavigate()
    if (!username) {
        return <Typography variant="h6">Must be logged in to view profile.</Typography>;
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
        localStorage.setItem("email", context.email)
        setAlertMessage(response.message)
        setTimeout(() => {
            setAlertMessage(null);
        }, 2500);
    };


    const handleDeleteOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = async () => {
    
        try {
            const response = await deleteUser(token);
            localStorage.clear()
            setLoggedIn(false);
            setUsername(null); 

        } catch (error) {
            console.error("Error deleting user", error);
            setAlertMessage({ type: "error", text: "Failed to delete user. Please try again." });
        }
    };
    return (
        <Card sx={{ maxWidth: 400, margin: "auto", padding: 3, textAlign: "center", boxShadow: 3, background:"#eeeeee" }}>
        <CardContent>
        
        <Avatar sx ={{background: "teal", margin: "auto"}}>
        {username.charAt(0).toUpperCase()}
        </Avatar> 
        <Typography variant="h6" sx={{ marginTop: 2 }}>{username}</Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>{email}</Typography>
        <Button sx={{opacity:.8, color: "black"}} variant="contained" onClick={handleOpen}>Update Email</Button>
        {alertMessage && <Alert severity="success">{alertMessage}</Alert>}
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Email</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error">{error}</Typography>}
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
            
            <Button
                sx={{background: "#ff7373", opacity: 0.8, margin: 2.5, color: "black"}} 
                onClick={handleDeleteOpen}>Delete Account</Button>

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
            </CardContent>
            </Card>
        
    )
}