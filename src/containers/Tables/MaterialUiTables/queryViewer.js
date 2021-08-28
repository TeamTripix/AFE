import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import IntegrationNotistack from "../../notification";

// +++++++++++
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
// +++++++++++

import axios from "axios";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
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
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon style={{color:'white'}}/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// +++++++++++
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
// +++++++++++

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  // +++++++
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  // +++++++

  // +++++++
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  // +++++++

  // ++++++++
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  // ++++++++

  // ++++++++
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      //   timer.current = window.setTimeout(() => {
      //     setSuccess(true);
      //     setLoading(false);
      //   }, 2000);
    }
  };
  // ++++++++

  const [open, setOpen] = React.useState(false);
  const [enable, setEnable] = React.useState(true);
  const [notification, setNotification] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setEnable(true);
    setNotification(false);
  };

  const formHandleChange = (e) => {
    if (e.target.value) {
      setEnable(false);
    } else {
      setEnable(true);
      setSuccess(false);
      // setNotification(false)
    }
  };

  const enquiryResponse = (e) => {
    e.preventDefault();
    handleButtonClick();
    const enquiryResponseValue = e.target[0].value;
    const sendData = {
      full_name: props.data.first_name + " " + props.data.last_name,
      response: enquiryResponseValue,
      mobile: props.data.mobile,
      email: props.data.email,
      student_id: null,
    };
    axios({
      method: "post",
      url: "http://35.244.8.93:7000/api/enquiry/response/insert",
      data: sendData,
    })
      .then((response) => {
        if (response.status === 200 && response.data.affectedRows === 1) {
          setSuccess(true);
          setLoading(false);
          setNotification({
            on: true,
            variant: "success",
            msg: "Send successfully",
          });
          setTimeout(() => {
            setNotification({ on: false, variant: "", msg: "" });
          }, 3000);
        } else {
          setLoading(false);
          setSuccess(false);
          setNotification({
            on: true,
            variant: "fail",
            msg: "Failed Server Error",
          });

          setTimeout(() => {
            setNotification({ on: false, variant: "", msg: "" });
          }, 3000);
        }
      })
      .catch((error) => {
        setLoading(false);
        setSuccess(false);
        setNotification({ on: true, variant: "failed", msg: "Send Failed" });
        setTimeout(() => {
          setNotification({ on: false, variant: "", msg: "" });
        }, 3000);
      });
  };

  return (
    <div>
      <Button variant="contained" style={{backgroundColor: '#7d4398', color: '#ffffff', padding: '5px 0px'}} onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" style={{backgroundColor:'#7D4398', color:'white'}} onClose={handleClose}>
          Query
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>
              {props.data.first_name} {props.data.last_name}
            </h4>
            <h4 style={{ marginRight: "20px", marginLeft: "20px" }}>
              {props.data.created_on.slice(8,10)}-{props.data.created_on.slice(5,7)}-{props.data.created_on.slice(0,4)}
            </h4>
          </div>
          <Typography
            gutterBottom
            style={{ fontSize: "0.9rem", marginBottom: "1rem" }}
          >
            {props.data.counselor_comment}
          </Typography>
          <form
            noValidate
            autoComplete="off"
            onSubmit={enquiryResponse}
            onChange={formHandleChange}
          >
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              style={{ width: "99%", minWidth:'19rem' }}
              placeholder="Query response..."
            />
            {/* <Button
              disabled={enable}
              style={{ marginTop: "0.5rem" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Send
            </Button> */}

            {/* ++++++++++++++++++++++ */}
            <div className={classes.root}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  className={buttonClassname}
                  color="primary"
                  disabled={loading === true || enable === true ? true : false}
                  // style={{backgroundColor:"#7d4398", color:'white'}}
                  type="submit"
                >
                  {success ? <CheckIcon /> : "Send"}
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
            {/* +++++++++++++++++++++++ */}
          </form>
          {notification.on === true ? (
            <IntegrationNotistack
              message={notification.msg}
              variant={notification.variant}
            />
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
