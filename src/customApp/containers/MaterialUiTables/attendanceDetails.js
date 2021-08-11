import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import notificationAction from '../../../redux/notification/action'
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [close, setClose] = React.useState(true)
  useEffect(()=>{
    handleClickOpen()
  },[])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(notificationAction(false))
  };

  return (
    <div>
        {/* <div style={{display: 'flex', justifyContent:'center', marginBottom:'2px'}}>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
          View
      </Button>
        </div> */}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
          <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            
          </Toolbar>
        </AppBar>
        
        <div style={{display:"flex", justifyContent:"space-between", marginTop: '0.7rem'}}>
            <p style={{paddingLeft: '1rem'}}>{props.date.getDate()} - {props.date.getMonth()} - {props.date.getFullYear()}</p>
            <p style={{paddingRight: '1rem'}}>{props.stData.user_first_name} {props.stData.user_last_name}</p>
        </div>
      </Dialog>
    </div>
  );
}
