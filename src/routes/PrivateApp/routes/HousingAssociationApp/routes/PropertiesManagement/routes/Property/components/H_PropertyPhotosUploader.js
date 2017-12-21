import React from 'react';
import { Button } from 'reactstrap'
import { map } from 'lodash';
import Dropzone from 'react-dropzone';

export default function H_PropertyPhotosUploader({ onFilesDrop, onFileDelete, uploadedFiles }) {
  return (
    <div>
      <Dropzone onDrop={onFilesDrop}>
        <div>
          Drag and drop files here
          or click to select
        </div>
      </Dropzone>
      {uploadedFiles &&
      <div>
        <h3>
          Uploaded file(s):
        </h3>
        {map(uploadedFiles, (file, key) =>
            <div key={file.name + key}>
              <img
                  height={''}
                  src={file.downloadURL}
                  style={{ maxWidth: '72px', maxHeight: '72px' }}
                  alt=""
              />
              <span>{file.name}</span>
              {' '}
              <Button size="sm" onClick={() => onFileDelete(file, key)}>
                Delete File
              </Button>
            </div>
        )}
      </div>}
    </div>
  );
}
