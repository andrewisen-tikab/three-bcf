import { createTheme } from '@mui/material/styles';
import palette from './palette';
import shadows from './shadows';
import customShadows from './customShadows';

const theme = createTheme({
    palette: {
        ...palette,
        mode: 'light',
        // @ts-ignore
    },

    shadows: shadows(),
    customShadows: customShadows(),
});

export default theme;
