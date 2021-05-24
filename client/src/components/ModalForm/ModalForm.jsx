import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../api/post";
import FileBase64 from "react-file-base64";
import { createPost, updatePost } from "../../redux/actions";
const ModalForm = ({ open, setOpen, userId, setCreated, updateValues }) => {
  const toggleModal = (open) => setOpen(!open);
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      title: updateValues?.title || "",
      description: updateValues?.description || "",
      content: updateValues?.content || "",
      photoUrl: updateValues?.photoUrl || "",
      userId: '',
    },
    onSubmit: (values) => {
      if (updateValues) {
        dispatch(updatePost(values, updateValues.id));
        setCreated(new Date());
        setOpen(false);
      } else {
        dispatch(createPost(values));
        setCreated(new Date());
        setOpen(false);
      }
    },
  });
  form.initialValues.userId = userId;
  return (
    <>
      <Dialog
        onClose={toggleModal}
        aria-labelledby="post-create-modal"
        open={open}
      >
        <DialogTitle>
          {updateValues ? "Updating post" : "Create post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form below to create your own post!
          </DialogContentText>
          <form>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Post title"
              type="text"
              fullWidth
              onChange={form.handleChange}
              value={form.values.title}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              onChange={form.handleChange}
              value={form.values.description}
            />
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Write what you think..."
              multiline
              rows={4}
              type="text"
              fullWidth
              onChange={form.handleChange}
              value={form.values.content}
            />
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                form.values.photoUrl = base64;
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal} color="primary">
            Cancel
          </Button>
          <Button onClick={form.handleSubmit} color="primary">
            {updateValues ? "Update post" : "Create post"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalForm;
