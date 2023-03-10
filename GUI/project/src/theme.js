import { createTheme } from '@mui/material/styles';
import { lightGreen,amber } from '@mui/material/colors';

const theme = createTheme({
        palette: {
          primary: lightGreen,
          secondary: amber,
        }
});

export default theme;