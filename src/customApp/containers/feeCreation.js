import React from "react";
import { Button, IconButton, makeStyles, DialogTitle, DialogContent, DialogActions, Dialog, TextField, } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";


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

export function LayoutTextFields() {
  // const [disable, setDisable] = useState(true);
  const classes = useStyles();

  const updateFormSubmit = (e) => {
    e.preventDefault();
    const formData = document.querySelectorAll('#updateData')
    const data = new FormData(formData[0])
    var fieldName = []
    for (var i = 0; 8 > i; i++) {
      fieldName.push(e.target[i].name)
    }
    const fieldData = []
    for (let i = 0; fieldName.length > i; i++) {
      let a = data.get(fieldName[i])
      fieldData.push(a)
    }
    const updateSendData = {
      student_id: fieldData[0],
      fees_type: fieldData[1],
      paid_fees: fieldData[2],
      fees_status: fieldData[3],
      comment: fieldData[4],
      total_fees: fieldData[5],
      installment_type: fieldData[6],
      next_schedule_date: fieldData[7]
    }
    axios({
      method: 'post',
      url: 'http://35.244.8.93:7000/api/fee/insert',
      data: updateSendData
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  });
  };
  return (
    <>
      <form onSubmit={updateFormSubmit} id="updateData">
        <div className={classes.root}>
          <TextField
            label="Student ID"
            style={{ margin: 5, width: "98%" }}
            fullWidth
            margin="normal"
            type="number"
            required={true}
            name='studentID'
          />
          <div style={gap}>
            <TextField
              label="Fees Type"
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
              className={classes.textField}
              type="number"
              required={true}
              name='paidFees'

            />
          </div>
          <div style={gap}>
            <TextField
              label="Fees Status"
              className={classes.textField}
              required={true}
              name='feesStatus'

            />
            <TextField
              label="Comment"
              className={classes.textField}
              type="string"
              required={true}
              name='comment'

            />
          </div>
          <div style={gap}>
            <TextField
              label="Total Fees"
              className={classes.textField}
              type="number"
              required={true}
              name='totalFees'

            />
            <TextField
              label="Installment Type"
              className={classes.textField}
              required={true}
              name='installmentType'

            />
          </div>

          <TextField
            label="Next Schedule Date"
            style={{ margin: 5, width: "98%" }}
            fullWidth
            margin="normal"
            required={true}
            name='nextScheduleDate'

          />
        </div>
        <DialogActions>
          <Button color="primary" type="submit" variant='contained'>
            Create
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
      <Fab size="small" color="secondary" aria-label="add" className={classes.margin} onClick={handleClickOpen} >
          <AddIcon />
        </Fab>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" >
          <section style={{ display: 'flex', justifyContent: 'space-between' }}>
            Create
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
