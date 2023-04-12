import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    makeStyles,
    Slide
} from "@material-ui/core";
import clsx from "clsx";
import red from "@material-ui/core/colors/red";
const useStyles = makeStyles(() => ({
    dialog: {
        borderRadius: 0
    },
    button: {
        borderRadius: 0,
        textTransform: "none",
        padding: 5,
    },
    logout: {
        color: "#fff",
        backgroundColor: red[500],
        "&:hover": {
            backgroundColor: red[700]
        }
    },
    countdown: {
        color: red[700]
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SessionTimeoutDialog = ({ open, countdown, onLogout, onContinue }) => {
    const classes = useStyles();
    return (
        <Dialog
            open={open}
            classes={{ paper: classes.dialog }}
            TransitionComponent={Transition}>
            <DialogTitle>
                Atenção
            </DialogTitle>
            <DialogContent>
                <Typography variant="body2">
                    Esta sessão será encerrada em{" "}
                    <span className={classes.countdown}>{countdown}</span> segundos.
                </Typography>
                <Typography variant="body2">{`Continuar conectado?`}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onLogout}
                    variant="contained"
                    className={clsx(classes.logout, classes.button)}>
                    Encerrar
                </Button>
                <Button
                    onClick={onContinue}
                    color="primary"
                    variant="contained"
                    className={classes.button}>
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default SessionTimeoutDialog;