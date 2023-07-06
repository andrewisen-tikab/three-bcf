import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Three from './components/Three';
import UI from './components/UI';
import { store } from './state/store';
import './style.css';

import Box from '@mui/material/Box';
import FlexLayout from './components/FlexLayout';

export function App() {
    return (
        <Provider store={store}>
            <FlexLayout />
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
