import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme/theme';
import Three from './components/Three';
import UI from './components/UI';
import { store } from './state/store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './style.css';

import Box from '@mui/material/Box';
import FlexLayout from './components/FlexLayout';

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <FlexLayout />
            </Provider>
        </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);