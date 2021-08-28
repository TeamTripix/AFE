import React, { useState } from "react";
import {
  Button,
  IconButton,
  makeStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import IntegrationNotistack from '../../containers/notification'
// +++++++++++
import clsx from "clsx";
// import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import CheckIcon from "@material-ui/icons/Check";
// +++++++++++

// ****************form component start****************

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: '0.25rem',
    width: "16.6rem",
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

const gap = {
  marginTop: "10px",
  marginBottom: "10px",
};

export function LayoutTextFields(props) {
  const [disable, setDisable] = useState(true);
  const [notification, setNotification] = React.useState(false)
  const [feesType, setFeesType] = React.useState("");
  const [feesStatus, setFeesStatus] = React.useState("");
  const [installmentType, setInstallmentType] = React.useState("");
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

    const handleFeesType = (e) => {
      setFeesType(e.target.value);
      console.log(e.target.value)
      console.log(feesType)

    };
  
    const handleFeesStatus = (e) => {
      setFeesStatus(e.target.value);
      console.log(e.target.value)
      console.log(feesStatus)
    };
  
    const handleInstallmentType = (e) => {
      setInstallmentType(e.target.value);
      console.log(e.target.value)
      console.log(installmentType)
    };
  

  const {
    fees_type,
    paid_fees,
    fees_status,
    comment,
    total_fees,
    installment_type,
    next_schedule_date,
    student_id,
  } = props.props;


  const formUpdate = (e) => {
    if (
      fees_type === feesType ||
      paid_fees === e.target.value ||
      fees_status === feesStatus ||
      unescape(comment) === e.target.value ||
      total_fees === e.target.value ||
      installment_type === installmentType ||
      next_schedule_date === e.target.value
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const updateFormSubmit = (e) => {
    e.preventDefault();
    handleButtonClick();
    const formData = document.querySelectorAll("#updateData");
    const data = new FormData(formData[0]);
    var fieldName = [];
    for (var i = 0; 7 > i; i++) {
      fieldName.push(e.target[i].name);
    }
    const fieldData = [];
    for (let i = 0; fieldName.length > i; i++) {
      var a = data.get(fieldName[i]);
      fieldData.push(a);
    }

    const sendData = {
      fees_type: fieldData[0],
      paid_fees: fieldData[1] ,
      fees_status: fieldData[2],
      comment: fieldData[3],
      total_fees: fieldData[4],
      installment_type: fieldData[5],
      next_schedule_date: fieldData[6],
      student_id: student_id,
    }


    

// ********************axios*****************
    
    axios({
      method: 'patch',
      url: 'http://35.244.8.93:7000/api/fee/update',
      // url: 'http://127.0.0.1:7000/api/fee/update',
      data: sendData
    })
      .then((response) => {
        if (response.status === 200 && response.data.affectedRows === 1) {
          setSuccess(true);
            setLoading(false);
          setNotification({on:true, variant: "success", msg:"Update successfully"})
          setTimeout(() => {
              setNotification({on:false, variant: "", msg:""})  
          }, 3000);
        }
        else {
          setLoading(false)
          setSuccess(false)
          setNotification({
            on: true,
            variant: "error",
            msg: "Failed Server Error",
          });

          setTimeout(() => {
            setNotification({ on: false, variant: "", msg: "" });
          }, 3000);
      }
      })
      .catch((error) => {
        setLoading(false)
          setSuccess(false)
        setNotification({on:true, variant: "failed", msg:"Updated Failed"})
        setTimeout(() => {
            setNotification({on:false, variant: "", msg:""})  
        }, 3000);
      });

// **************************axios*********************

  };

  const feesTypeLabels = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Cash',
      label: 'Cash',
    },
    {
      value: 'Card',
      label: 'Card',
    },
    {
      value: 'Online',
      label: 'Online',
    }
  ];

  const feesStatusLabels = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Paid',
      label: 'Paid',
    },
    {
      value: 'Unpaid',
      label: 'Unpaid',
    }
  ];

  const installmentTypeLabels = [
    {
      value: '',
      label: '',
    },
    {
      value: 'Monthly',
      label: 'Monthly',
    }
  ];

  return (
    <>
      <form onChange={formUpdate} onSubmit={updateFormSubmit} id="updateData">
      <div className={classes.root}>
          
          <div style={gap}>
            <TextField
              label="Fees Type"
              style={{ marginRight: "0.625rem" }}
              variant="outlined"
              className={classes.textField}
              select
              value={feesType}
              required={true}
              onChange={handleFeesType}
              name="feesType"
            >
              {feesTypeLabels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Paid Fees"
              className={classes.textField}
              style={{ marginLeft: "0.625rem" }}
              type="number"
              required={true}
              name="paidFees"
              variant="outlined"
            />
          </div>
          <div style={gap}>
            {/* <TextField
              label="Fees Status"
              className={classes.textField}
              required={true}
              name="feesStatus"
            /> */}

            <TextField
              label="Fees Status"
              className={classes.textField}
              select
              variant="outlined"
              value={feesStatus}
              required={true}
              style={{ marginRight: "0.625rem" }}
              onChange={handleFeesStatus}
              name="feesStatus"
            >
              {feesStatusLabels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Total Fees"
              className={classes.textField}
              type="number"
              style={{ marginLeft: "0.625rem" }}
              required={true}
              name="totalFees"
              variant="outlined"
            />
          </div>
          <div style={gap}>
            <TextField
              label="Installment Type"
              className={classes.textField}
              select
              value={installmentType}
              required={true}
              style={{ marginRight: "0.625rem" }}
              variant="outlined"
              onChange={handleInstallmentType}
              name="installmentType"
            >
              {installmentTypeLabels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              // label="Next Schedule Date"
              className={classes.textField}
              style={{ marginLeft: "0.625rem" }}
              variant="outlined"
              required={true}
              name="nextScheduleDate"
              type="date"
            />
          </div>

          <TextField
            label="Comment"
            fullWidth
            type="string"
            margin="normal"
            style={{ marginTop: "0.625rem", width: "100%" }}
            variant="outlined"
            required={true}
            name="comment"
          />
        </div>
        <DialogActions>
          {/* ++++++++++++++++++++++ */}
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                // style={{backgroundColor:'#7d4398', color:'white'}}
                className={buttonClassname}
                disabled={loading === true || disable === true ? true : false}
                type="submit"
              >
                {success ? <CheckIcon /> : "Update"}
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

        </DialogActions>
      </form>
      {notification.on === true ? <IntegrationNotistack message={notification.msg} variant={notification.variant}/> : "" }
    </>
  );
}

// *****************form component end***************

export default function FormDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton
        aria-label="delete"
        onClick={handleClickOpen}
        className={classes.margin}
        size="large"
      >
        <EditIcon />
      </IconButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" style={{backgroundColor:'#7D4398', color:'white'}}>
          <section style={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
            Update
            <IconButton
              aria-label="delete"
              onClick={handleClose}
              className={classes.margin}
              size="large"
            >
              <CloseIcon fontSize="inherit" style={{color:'white'}}/>
            </IconButton>
          </section>
        </DialogTitle>
        <DialogContent dividers>
          <LayoutTextFields props={props.data} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
