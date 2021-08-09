import React, { useState } from "react";
import { Button, IconButton, makeStyles, DialogTitle, DialogContent, DialogActions, Dialog, TextField, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';


// ****************form component start****************

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const gap = {
  marginTop: "10px",
  marginBottom: "10px",
};

export function LayoutTextFields(props) {
  const [disable, setDisable] = useState(true);
  const classes = useStyles();

  const {
    fees_type,
    paid_fees,
    fees_status,
    comment,
    total_fees,
    installment_type,
    next_schedule_date,
  } = props.props;

  const formUpdate = (e) => {
    if (
      fees_type === e.target.value ||
      paid_fees === e.target.value ||
      fees_status === e.target.value ||
      comment === e.target.value ||
      total_fees === e.target.value ||
      installment_type === e.target.value ||
      next_schedule_date === e.target.value
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const updateFormSubmit = (e) => {
    e.preventDefault();
    const formData = document.querySelectorAll('#updateData')
    const data = new FormData(formData[0])
    var fieldName = []
    for (var i = 0; 7 > i; i++) {
      fieldName.push(e.target[i].name)
    }
    const fieldData = []
    for (let i = 0; fieldName.length > i; i++) {
      var a = data.get(fieldName[i])
      fieldData.push(a)
    }
    console.log(fieldData)
    axios.post('/login',
            {
                value: fieldData
            })
            .then((response) => {
                if (response.data === "userLogin") {
                    // clearEmail('')
                    // clearPassword('')

                    // history.push("/welcome")

                } else {
                    // setError(true)
                    // setLabel("Incorrect email or password")
                }
            })
            .catch((error) => {
                // setError(true)
                // setLabel("please connect to the server first")
            });
  };
  return (
    <>
      <form onChange={formUpdate} onSubmit={updateFormSubmit} id="updateData">
        <div className={classes.root}>
          {/* <TextField
            // id="standard-full-width"
            label="Student ID"
            style={{ margin: 5, width: "98%" }}
            fullWidth
            margin="normal"
            defaultValue={student_id}
            type="number"
            required={true}
            name='studentID'
          /> */}
          <div style={gap}>
            <TextField
              label="Fees Type"
              // id="margin-none"
              defaultValue={fees_type}
              className={classes.textField}
              required={true}
              name='feesType'

            />
            {/* <Select
              label="Fees Type"
              id="margin-none"
              defaultValue={feesType}
              className={classes.textField}
              // value={age}
              required={true}
            >
              <MenuItem value={"online"}>Online</MenuItem>
              <MenuItem value={"card"}>Card</MenuItem>
              <MenuItem value={"cash"}>Cash</MenuItem>
            </Select> */}

            <TextField
              label="Paid Fees"
              // id="margin-none"
              defaultValue={paid_fees}
              className={classes.textField}
              type="number"
              required={true}
              name='paidFees'

            />
          </div>
          <div style={gap}>
            <TextField
              label="Fees Status"
              // id="margin-none"
              defaultValue={fees_status}
              className={classes.textField}
              required={true}
              name='feesStatus'

            />
            <TextField
              label="Comment"
              // id="margin-none"
              defaultValue={comment}
              className={classes.textField}
              type="string"
              required={true}
              name='comment'

            />
          </div>
          <div style={gap}>
            <TextField
              label="Total Fees"
              // id="margin-none"
              defaultValue={total_fees}
              className={classes.textField}
              type="number"
              required={true}
              name='totalFees'

            />
            <TextField
              label="Installment Type"
              // id="margin-none"
              defaultValue={installment_type}
              className={classes.textField}
              required={true}
              name='installmentType'

            />
          </div>

          <TextField
            // id="standard-full-width"
            label="Next Schedule Date"
            style={{ margin: 5, width: "98%" }}
            fullWidth
            margin="normal"
            defaultValue={next_schedule_date}
            required={true}
            name='nextScheduleDate'

          />
        </div>
        <DialogActions>
          <Button color="primary" type="submit" variant='contained' disabled={disable}>
            Update
          </Button>
        </DialogActions>
      </form>
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
      <IconButton aria-label="delete" onClick={handleClickOpen} className={classes.margin} size="large">
        <EditIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" >
          <section style={{ display: 'flex', justifyContent: 'space-between' }}>
            Update
            <IconButton aria-label="delete" onClick={handleClose} className={classes.margin} size="large">
              <CloseIcon fontSize="inherit" />
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
