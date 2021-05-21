import { Button } from "@material-ui/core"

export const notification = (message,type,dispatch,enqueueSnackbar,closeSnackbar) => {
    dispatch(enqueueSnackbar({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: type,
            action: key => (
                <Button onClick={() => dispatch(closeSnackbar(key))}>Close</Button>
            ),
        },
    }))
}