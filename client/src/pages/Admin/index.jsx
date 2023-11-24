import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';

import BackButton from '@components/BackButton';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal';

import { selectToken, selectUser } from '@containers/Client/selectors';
import { deleteUserById, getAllUsers } from './actions';
import { selectUsers } from './selectors';

import classes from './style.module.scss';

const Admin = ({ users, currentUser, intl: { formatMessage }, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (currentUser?.role !== 1) {
      navigate('/');
      toast.error(formatMessage({ id: 'app_you_are_not_admin' }));
    } else {
      dispatch(getAllUsers());
    }
  }, [currentUser?.role, dispatch, formatMessage, navigate]);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUserById(userToDelete, token));
    }
    setIsModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <table className={classes.usersTable}>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="app_username" />
            </th>
            <th>
              <FormattedMessage id="app_email" />
            </th>
            <th>
              <FormattedMessage id="app_email_verified" />
            </th>
            <th>
              <FormattedMessage id="app_actions" />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.id}>
              <td>{user?.username}</td>
              <td>{user?.email}</td>
              <td>{user?.isEmailVerified ? 'Yes' : 'No'}</td>
              <td>
                {user?.role !== 1 && (
                  <UserX className={classes.removeButton} onClick={() => handleDeleteClick(user?.id)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
        message={formatMessage({ id: 'app_are_you_sure_delete_user' })}
      />
    </div>
  );
};

Admin.propTypes = {
  users: PropTypes.array,
  currentUser: PropTypes.object,
  intl: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  currentUser: selectUser,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Admin));
