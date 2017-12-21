import React from 'react';
import { Alert } from 'reactstrap';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';

const dropzoneStyle = {
  width: '100%',
  height: '100%',
  cursor: 'pointer'
};

// Because Files are usually uploading by
// people clicking a button and bringing up a File window
const fakeButton = {
  backgroundColor: '#373d5c',
  padding: '6 12 12 6',
  color: '#fff'
};

const AddInvoiceDropzone = ({
  uploadInvoiceFile,
  rejectedFile,
  fileLoading,
  fileSaved
}) =>
  <div>
    {!fileLoading &&
      !fileSaved &&
      <Dropzone
        onDrop={uploadInvoiceFile}
        accept=".pdf, .doc, .docx, .pages, .xls, .xlsx, .numbers"
        style={dropzoneStyle}
      >
        <Alert color={'info'}>
          <div style={{ textAlign: 'center' }}>
            <FontAwesome name="file" size="1x" />
            <h6>Drop your photos here</h6>
            <p>or</p>
            <div style={fakeButton}>
              Select Photo(s)
            </div>
            <small>
              Accepted formats: .png, .jpg
            </small>
          </div>
        </Alert>
      </Dropzone>}

    {fileLoading &&
      <Alert color="info">
        <div style={{ textAlign: 'center' }}>
          <FontAwesome name="fa-cloud-upload" spin size="2x" />
          Uploading your images
        </div>
      </Alert>}
    {fileSaved && <Alert color="success"><div>File saved</div></Alert>}

    {rejectedFile &&
      <Alert color="danger">
        <p>
          '{rejectedFile.name}' isn't the right format,
          please upload your photos as one of these formats:
          .png, .jpg
        </p>
      </Alert>}

  </div>;

export default AddInvoiceDropzone;
