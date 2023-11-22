import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent } from '@mui/material';

import classes from './style.module.scss';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: { padding: '0.5rem' },
      }}
    >
      <DialogContent className={classes.dialog}>Are you sure you want to delete this post?</DialogContent>
      <DialogActions className={classes.actions}>
        <button className={`${classes.button} ${classes.cancel}`} onClick={onClose}>
          Cancel
        </button>
        <button className={`${classes.button} ${classes.delete}`} onClick={onConfirm}>
          Delete
        </button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default ConfirmDeleteModal;
