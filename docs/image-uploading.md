# Image Uploading

When a Provider adds/edits the Property Form it should allow for them to drag image files that are uploaded Firebase Storage: https://firebase.google.com/docs/storage/web/start

Uploading state not easily done using RRF:
>There is this.props.firebase.uploadFileWithProgress. Currently actions are dispatched for this, but there is not a storage reducer (though one is planned) so there isn't anything in state as far as storage

> Or you can use the promise that is returned from this.props.uploadFiles or this.props.uploadFile and just set component state (instead of needing to worry about it being in redux)

> The storage state reducer shouldn't be hard to get to, it just hasn't been thought of as "high priority" since not many have asked for it
