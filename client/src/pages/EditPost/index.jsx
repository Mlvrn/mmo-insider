import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import BackButton from '@components/BackButton';

import { getPostById } from '@pages/PostDetail/action';
import { selectToken } from '@containers/Client/selectors';
import { selectPost } from '@pages/PostDetail/selectors';

import classes from './style.module.scss';
import { updatePostById } from './action';

const EditPost = ({ post, token, intl: { formatMessage } }) => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post?.title);
  const [shortDescription, setShortDescription] = useState(post?.shortDescription);
  const [mainImage, setMainImage] = useState(post?.mainImage);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [content, setContent] = useState(post?.content);

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  const handleFiles = (files) => {
    if (files.length > 0) {
      setMainImage(files[0]);
      setSelectedFileName(files[0].name);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer;
    handleFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('content', content);
    if (mainImage) {
      formData.append('mainImage', mainImage);
    }

    dispatch(updatePostById(postId, formData, token));
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <form className={classes.form} onSubmit={onSubmit}>
        {/* Title */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>
            <FormattedMessage id="app_title" />
          </div>
          <input
            className={`${classes.formInput} ${classes.title}`}
            type="text"
            placeholder={formatMessage({ id: 'app_title_placeholder' })}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>
            <FormattedMessage id="app_description" />
          </div>
          <input
            className={`${classes.formInput} ${classes.description}`}
            type="text"
            placeholder={formatMessage({ id: 'app_description_placeholder' })}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        {/* Main Image */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>
            <FormattedMessage id="app_main_image" />
          </div>
          <label htmlFor="images" className={classes.dropContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
            <span className={classes.dropTitle}>
              {selectedFileName || formatMessage({ id: 'app_image_placeholder' })}
            </span>
            <input
              type="file"
              id="images"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFiles(event.target.files)}
            />
          </label>
        </div>

        {/* Content */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>
            <FormattedMessage id="app_content" />
          </div>
          <ReactQuill className={classes.quill} theme="snow" value={content} onChange={setContent} />
        </div>

        {/* Submit Button */}
        <button type="submit" className={classes.createButton}>
          <FormattedMessage id="app_edit_post" />
        </button>
      </form>
    </div>
  );
};

EditPost.propTypes = {
  post: PropTypes.object,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  post: selectPost,
});

export default injectIntl(connect(mapStateToProps)(EditPost));
