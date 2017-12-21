import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import H_PropertyPhotosUploader from '../components/H_PropertyPhotosUploader';

class H_PropertyPhotosUploaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: null,
      filesPath: `properties/${this.props.propertyKey}/uploadedFiles`
    };
  }

  componentDidMount() {
    this.props.firebase
      .database()
      .ref(this.state.filesPath)
      .on('value', snap => {
        this.setState({
          uploadedFiles: snap.val()
        })
      });
  }

  onFilesDrop = files => {
    // Uploads files and push's objects containing metadata to database at dbPath
    // uploadFiles(storagePath, files, dbPath)
    // http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/upload.html#
    this.props.firebase.uploadFiles(
      this.state.filesPath,
      files,
      this.state.filesPath
    );
  };

  onFileDelete = (file, key) => {
    // Deletes file and removes metadata from database
    // deleteFile(storagePath, dbPath)
    //http://docs.react-redux-firebase.com/history/v2.0.0/docs/recipes/upload.html#
    this.props.firebase.deleteFile(
      file.fullPath,
      `${this.state.filesPath}/${key}`
    );
  };

  render() {
    return (
      <H_PropertyPhotosUploader
        uploadedFiles={this.state.uploadedFiles}
        onFileDelete={this.onFileDelete}
        onFilesDrop={this.onFilesDrop}
        propertyKey={this.props.propertyKey}
      />
    );
  }
}

H_PropertyPhotosUploaderContainer.propTypes = {
  firebase: PropTypes.object.isRequired,
  uploadedFiles: PropTypes.object
};

export default firebaseConnect()(H_PropertyPhotosUploaderContainer);
