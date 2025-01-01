import PropTypes from 'prop-types';
import { Snackbar, Alert } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

CustomSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CustomSnackbar;
