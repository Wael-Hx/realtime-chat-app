import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import PageviewIcon from "@material-ui/icons/Pageview";
import AddCommentRoundedIcon from "@material-ui/icons/AddCommentRounded";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../actions/chat";

export default function AddContact({ codeName }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  let error = useSelector(({ chat }) => chat.errors);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(addContact(codeName, search));
    setSearch("");
  };
  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddCommentRoundedIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            input your contact codename to add into your contact list
          </DialogContentText>
          <form onSubmit={handleSearch}>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              error={!!error}
              helperText={error ? error : null}
              autoFocus
              margin="dense"
              label="type the code..."
              type="text"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <PageviewIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
