import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormattedMessage, injectIntl } from 'react-intl';

import BackButton from '@components/BackButton';

import { selectToken } from '@containers/Client/selectors';
import { createPost } from './action';

import classes from './style.module.scss';

const CreatePost = ({ token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState('');

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setMainImage(file);
      setSelectedFileName(file.name); // This can be removed if you don't need the file name anymore
      setPreview(URL.createObjectURL(file));
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
    dispatch(createPost(formData, token));
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
            {preview ? (
              <img src={preview} alt="Preview" className={classes.imagePreview} />
            ) : (
              <span className={classes.dropTitle}>{formatMessage({ id: 'app_image_placeholder' })}</span>
            )}
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
          <FormattedMessage id="app_create_post" />
        </button>
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(CreatePost));
