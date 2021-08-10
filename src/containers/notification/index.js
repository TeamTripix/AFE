import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

function MyApp(props) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    handleClickVariant(message)
  },[message])
  const message = props.message


  const handleClickVariant = (variant) => {
    enqueueSnackbar('This is a success message!', { variant });
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
