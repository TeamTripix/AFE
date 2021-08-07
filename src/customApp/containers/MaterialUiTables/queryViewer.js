import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// import axios from 'axios';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const enquiryResponse = (e)=>{
        e.preventDefault()
        // const enquiryResponseValue = e.target[0].value
        // axios.post('/login',
        //     {
        //         value: enquiryResponseValue
        //     })
        //     .then((response) => {
        //         if (response.data === "userLogin") {
        //             clearEmail('')
        //             clearPassword('')

        //             history.push("/welcome")

        //         } else {
        //             setError(true)
        //             setLabel("Incorrect email or password")
        //         }
        //     })
        //     .catch((error) => {
        //         setError(true)
        //         setLabel("please connect to the server first")
        //     });
    }
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Query
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <h4>{props.name}</h4>
                        <Typography style={{ marginRight: '20px' }}>{props.date}</Typography>

                    </div>
                    <Typography gutterBottom style={{fontSize: "0.9rem",marginBottom: '1rem'}}>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                    <form noValidate autoComplete="off" onSubmit={enquiryResponse}>
                    <TextareaAutosize aria-label="minimum height" minRows={5} style={{width:'100%'}} placeholder="Minimum 3 rows" />
                    <Button variant="contained" color="primary" type="submit">Send</Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}