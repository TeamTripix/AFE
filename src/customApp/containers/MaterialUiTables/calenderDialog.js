import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DateFnsUtils from "@date-io/date-fns";
import { blue } from "@material-ui/core/colors";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";
import FullScreenDialog from './attendanceDetails'
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, Data } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [selectedDate, handleDateChange] = useState(new Date());
  const [attOpen, setAttOpen] = useState(false)
  const handleCalendarClick = (e) => {
    handleDateChange(e);
    setAttOpen(true)
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      {/* <DialogTitle id="alert-dialog-title">{nameData}</DialogTitle> */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={selectedDate}
          onChange={handleCalendarClick}
          variant="static"
        />
      </MuiPickersUtilsProvider>
      {attOpen === true ?  <FullScreenDialog date={selectedDate} open={true} stData={Data}/> : ""}

    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function CustomCalendar(props) {
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <TodayIcon onClick={handleClickOpen} />
      <SimpleDialog open={open} onClose={handleClose} Data={props.Data} />
    </div>
  );
}
