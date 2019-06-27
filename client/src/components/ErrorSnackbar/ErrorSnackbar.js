import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
}));

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}
  

function MySnackbarContentWrapper(props) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other} = props;

    return (
        <SnackbarContent 
            className={classes[variant]}
            aria-describedby='error-snackbar'
            message={
                <span id='error-snackbar' className={classes.message}>
                    <ErrorIcon className={classes.iconVariant} />
                    {message}
                </span>
            }
            action={[
                <IconButton key='close' aria-label='Close' color='inherit' onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    )
}

export default function ErrorSnackbar(props) {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={props.open}
            autoHideDuration={3000}
            onClose={props.handleClose}
            onEntered={props.onEntered}
        >
            <MySnackbarContentWrapper 
                onClose={props.handleClose}
                variant='error'
                message={props.message}
            />

        </Snackbar>
    )
}
