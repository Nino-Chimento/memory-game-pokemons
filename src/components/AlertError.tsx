import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export const AlertError = () =>
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">An error occurred while loading resources!</Alert>

    </Stack>
