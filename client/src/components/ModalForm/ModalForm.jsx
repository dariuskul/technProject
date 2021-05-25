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
import FileBase64 from "react-file-base64";
import { createPost, updatePost } from "../../redux/actions";
import * as Yup from 'yup';
const ModalForm = ({ open, setOpen, userId, setCreated, updateValues }) => {
  const dispatch = useDispatch();


  const postSchema = Yup.object().shape({
    title: Yup.string().required('Please provide post title'),
    description: Yup.string().required('Please provide post description '),
    content: Yup.string().required('Please provide post content '),
    photoUrl: Yup.string().required('Please provide image for the post'),
  })
  const form = useFormik({
    initialValues: {
      title: updateValues?.title || "",
      description: updateValues?.description || "",
      content: updateValues?.content || "",
      photoUrl: updateValues?.photoUrl || "",
      userId: '',
    },
    onSubmit: (values, {resetForm}) => {
      if (updateValues) {
        dispatch(updatePost(values, updateValues.id));
        setCreated(new Date());
        toggleModal();
        resetForm();
      } else {
        dispatch(createPost(values));
        setCreated(new Date());
        toggleModal();
        resetForm();
      }
    },
    validationSchema: postSchema
  });
  form.initialValues.userId = userId;
  const toggleModal = (open) => {
    setOpen(!open);
  }
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
              error={form.errors.title ? true : false}
              helperText={form.errors.title ? form.errors.title : ''}
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
              error={form.errors.description ? true : false}
              helperText={form.errors.description ? form.errors.description : ''}
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
              error={form.errors.content ? true : false}
              helperText={form.errors.content ? form.errors.content : ''}
            />
            <FileBase64
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                form.values.photoUrl = base64;
              }}  
            />
            {form.errors.photoUrl ? <span style={{color: 'red'}}>{form.errors.photoUrl}</span> : ''}    
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
