import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import BackButton from '@components/BackButton';

import { selectToken } from '@containers/Client/selectors';
import { createPost } from './action';

import classes from './style.module.scss';

const CreatePost = ({ token }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [content, setContent] = useState('');

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
    dispatch(createPost(formData, token));
  };

  return (
    <div className={classes.container}>
      <BackButton />
      <form className={classes.form} onSubmit={onSubmit}>
        {/* Title */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>Title</div>
          <input
            className={`${classes.formInput} ${classes.title}`}
            type="text"
            placeholder="e.g. Some interesting title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>Description</div>
          <input
            className={`${classes.formInput} ${classes.description}`}
            type="text"
            placeholder="Short description"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        {/* Main Image */}
        <div className={classes.formItem}>
          <div className={classes.formLabel}>Main Image</div>
          <label htmlFor="images" className={classes.dropContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
            <span className={classes.dropTitle}>{selectedFileName || 'Drop files here or click to select'}</span>
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
          <div className={classes.formLabel}>Content</div>
          <ReactQuill className={classes.quill} theme="snow" value={content} onChange={setContent} />
        </div>

        {/* Submit Button */}
        <button type="submit" className={classes.createButton}>
          Create Post
        </button>
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(CreatePost);
