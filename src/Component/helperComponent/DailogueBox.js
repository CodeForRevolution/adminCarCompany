import React, { useState } from "react";

import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

const DailogueBox = (props) => {
  const { dailogueOPen, handleDailogueClose, deleteObject, deleteAstrologer } =
    props.data;
  const [loading, setloading] = useState(false);
  function handleClose() {
    handleDailogueClose();
  }
  async function YesIConfirm() {
    setloading(true);
    await deleteAstrologer(deleteObject._id);
    setloading(false);
    handleDailogueClose();
    var loading = true;
   
  }
  return (
    <React.Fragment>
      <Dialog
        open={dailogueOPen}
        onClose={handleDailogueClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you  want to Delete this Astrologer`}
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            NO
          </Button>
          <LoadingButton
            variant="outlined"
            color="error"
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            loading={loading}
            onClick={YesIConfirm}
            autoFocus
          >
            YES
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DailogueBox;
