import { createContext, useState } from 'react';
import CustomSnackbar from '../components/CustomSnackBar';

export const CustomSnackBarContext = createContext({});

export default function CustomSnackBarProvider({ children }) {
    const [openCustomSnackBar, setOpenCustomSnackBar] = useState(false);
    const [customSnackBarTitle, setCustomSnackBarTitle] = useState('');
    const [customSnackBarType, setCustomSnackBarType] = useState('');
    function showHideCustomSnackbar(title, type) {
        setOpenCustomSnackBar(true);
        setCustomSnackBarTitle(title);
        if (type === 'success') {
            setCustomSnackBarType('success');
        } else if (type === 'error') {
            setCustomSnackBarType('error');
        }

        setTimeout(() => {
            setOpenCustomSnackBar(false);
        }, 2000);
    }
    return (
        <CustomSnackBarContext.Provider
            value={{
                showHideCustomSnackbar,
                openCustomSnackBar,
                setOpenCustomSnackBar,
            }}>
            <CustomSnackbar
                title={customSnackBarTitle}
                type={customSnackBarType}
            />
            {children}
        </CustomSnackBarContext.Provider>
    );
}
