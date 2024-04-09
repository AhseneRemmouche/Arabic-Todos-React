import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { CustomSnackBarContext } from '../contexts/customSnackBarContext';

export default function CustomdSnackbars({ title, type }) {
    // const handleClick = () => {
    //     setOpenCustomSnackBar(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpenCustomSnackBar(false);
    // };
    const {
        openCustomSnackBar,
        } = useContext(CustomSnackBarContext);

    return (
        <div>
            <Snackbar
                open={openCustomSnackBar}
                autoHideDuration={3000}
                //onClose={handleClose}
            >
                <Alert
                    //onClose={handleClose}

                    severity={type}
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {title}
                </Alert>
            </Snackbar>
        </div>
    );
}
