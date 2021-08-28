import React from "react";
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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import IntegrationNotistack from "../../containers/notification";
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

export function LayoutTextFields() {
  // const [disable, setDisable] = useState(true);
  const [notification, setNotification] = React.useState(false);
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

  // const classes = useStyles();

  const handleFeesType = (e) => {
    setFeesType(e.target.value);
  };

  const handleFeesStatus = (e) => {
    setFeesStatus(e.target.value);
  };

  const handleInstallmentType = (e) => {
    setInstallmentType(e.target.value);
  };

  const updateFormSubmit = (e) => {
    e.preventDefault();
    handleButtonClick();
    const formData = document.querySelectorAll("#updateData");
    const data = new FormData(formData[0]);
    var fieldName = [];
    for (var i = 0; 8 > i; i++) {
      fieldName.push(e.target[i].name);
    }
    const fieldData = [];
    for (let i = 0; fieldName.length > i; i++) {
      let a = data.get(fieldName[i]);
      fieldData.push(a);
    }
    const updateSendData = {
      student_id: fieldData[0],
      fees_type: fieldData[1],
      paid_fees: fieldData[2],
      fees_status: fieldData[3],
      comment: fieldData[4],
      total_fees: fieldData[5],
      installment_type: fieldData[6],
      next_schedule_date: fieldData[7],
    };
    axios({
      method: "post",
      url: "http://35.244.8.93:7000/api/fee/insert",
      // url: "http://127.0.0.1:7000/api/fee/insert",
      data: updateSendData,
    })
      .then(function (response) {
        if (response.status === 200 && response.data.affectedRows === 1) {
          setSuccess(true);
          setLoading(false);
          setNotification({
            on: true,
            variant: "success",
            msg: "Created Successfully",
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
      .catch(function (error) {
        setLoading(false);
        setSuccess(false);
        setNotification({ on: true, variant: "failed", msg: "Created Failed" });
        setTimeout(() => {
          setNotification({ on: false, variant: "", msg: "" });
        }, 3000);
      });
  };

  const feesTypeLabels = [
    {
      value: "",
      label: "",
    },
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Card",
      label: "Card",
    },
    {
      value: "Online",
      label: "Online",
    },
  ];

  const feesStatusLabels = [
    {
      value: "",
      label: "",
    },
    {
      value: "Paid",
      label: "Paid",
    },
    {
      value: "Unpaid",
      label: "Unpaid",
    },
  ];

  const installmentTypeLabels = [
    {
      value: "",
      label: "",
    },
    {
      value: "Monthly",
      label: "Monthly",
    },
  ];

  return (
    <>
      <form onSubmit={updateFormSubmit} id="updateData">
        <div className={classes.root}>
          <TextField
            label="Student ID"
            variant="outlined"
            style={{ marginBottom: "0.625rem", width: "100%" }}
            fullWidth
            margin="normal"
            type="number"
            required={true}
            name="studentID"
          />
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
              label="Next Schedule Date"
              className={classes.textField}
              style={{ marginLeft: "0.625rem" }}
              InputLabelProps={{ shrink: true, required: true }}
              variant="outlined"
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
          {/* <Button color="primary" type="submit" variant="contained">
            Create
          </Button> */}
          {/* ++++++++++++++++++++++ */}
          <div className={classes.root}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                // color="primary"
                style={{ backgroundColor: "#7d4398", color: "white" }}
                className={buttonClassname}
                disabled={loading === true ? true : false}
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
        </DialogActions>
      </form>
      {notification.on === true ? (
        <IntegrationNotistack
          message={notification.msg}
          variant={notification.variant}
        />
      ) : (
        ""
      )}
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
      {/* <Fab
        size="small"
        color="secondary"
        aria-label="add"
        className={classes.margin}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab> */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#7d4398",
          color: "white",
          paddingTop: "4px 5px",
        }}
        onClick={handleClickOpen}
      >
        <AddIcon style={{ width: "1rem", height: "1rem" }} />
        Add
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          style={{ backgroundColor: "#7D4398", color: "white" }}
        >
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Create
            <IconButton
              aria-label="delete"
              onClick={handleClose}
              className={classes.margin}
              size="large"
            >
              <CloseIcon fontSize="inherit" style={{ color: "white" }} />
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
