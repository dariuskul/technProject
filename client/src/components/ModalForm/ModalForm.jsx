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
import { useDispatch } from "react-redux";
import { newPost } from "../../api/post";
import FileBase64 from "react-file-base64";
const ModalForm = ({ open, setOpen, userId, setCreated, values }) => {
  const toggleModal = (open) => setOpen(!open);
  const dispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      title: values?.title || "",
      description: values?.description || "",
      content: values?.content || "",
      photoUrl: values?.photoUrl || "",
      userId: userId,
    },
    onSubmit: (values) => {
      dispatch(newPost(values));
      setCreated(true);
    },
  });
  return (
    <>
      <Dialog
        onClose={toggleModal}
        aria-labelledby="post-create-modal"
        open={open}
      >
        <DialogTitle>{values ? "Updating post" : "Create post"}</DialogTitle>
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
            Create post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalForm;
