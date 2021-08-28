import React, { useEffect } from 'react';
// import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
// import { useDispatch } from 'react-redux';

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();
  const variant = props.variant
  const message = props.message
  useEffect(() => {
    handleClickVariant(variant, message)
  },[message,variant])


  // const handleClickVariant = (variant,message) => {
  //   enqueueSnackbar(message, 'success');
  // };

  const handleClickVariant = (variant,message) =>  {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message);
  
  };

  

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp message={props.message}/>
    </SnackbarProvider>
  );
}
