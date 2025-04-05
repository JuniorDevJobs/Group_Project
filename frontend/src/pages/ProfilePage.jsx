import {
    Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Card, CardContent, Typography, Snackbar, Slide, InputAdornment
} from "@mui/material";
import { Email, Delete, Edit } from "@mui/icons-material";
import { useContext, useState } from "react";
import { deleteUser, updateUser } from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function SlideUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function Profile() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const { setLoggedIn } = useContext(UserContext);
    const token = localStorage.getItem("access");
    const navigate = useNavigate();

    if (!username) {
        return <Typography variant="h6">Must be logged in to view profile.</Typography>;
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!email) {
            setSnack({ open: true, message: "Must provide new email to update.", severity: "error" });
            return;
        }
        const context = { email };
        const response = await updateUser(context, token);
        localStorage.setItem("email", context.email);
        setOpen(false);
        setSnack({ open: true, message: response.message, severity: "success" });
    };

    const handleDeleteConfirm = async () => {
        if (confirmText !== "DELETE") {
            setSnack({ open: true, message: "You must type DELETE to confirm.", severity: "warning" });
            return;
        }
        try {
            await deleteUser(token);
            localStorage.clear();
            setLoggedIn(false);
            setUsername(null);
            navigate("/");
        } catch (error) {
            console.error("Error deleting user", error);
            setSnack({ open: true, message: "Failed to delete user. Try again.", severity: "error" });
        }
    };

    return (
        <Card sx={{
            maxWidth: 400,
            margin: "auto",
            mt: 4,
            p: 3,
            textAlign: "center",
            boxShadow: 4,
            background: "#f7f9fb",
            borderRadius: 3
        }}>
            <CardContent>
                <Avatar sx={{
                    background: "teal",
                    width: 64,
                    height: 64,
                    margin: "auto",
                    boxShadow: "0 0 12px teal"
                }}>
                    {username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" sx={{ mt: 2 }}>{username}</Typography>
                <Typography variant="subtitle1" sx={{ mb: 2, opacity: 0.8 }}>{email}</Typography>

                <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => setOpen(true)}
                    sx={{ mb: 2, width: "100%" }}
                >
                    Update Email
                </Button>

                <Button
                    variant="contained"
                    startIcon={<Delete />}
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#ff4c4c"
                        },
                        width: "100%"
                    }}
                >
                    Delete Account
                </Button>
            </CardContent>

            {/* Update Email Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} TransitionComponent={SlideUp}>
                <DialogTitle>Update Email</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} TransitionComponent={SlideUp}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography sx={{ mb: 2 }}>
                        Type <b>DELETE</b> to confirm account deletion. This action is irreversible.
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder="Type DELETE"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={snack.open}
                onClose={() => setSnack({ ...snack, open: false })}
                autoHideDuration={3000}
                message={snack.message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </Card>
    );
}