import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Three from './components/Three';
import UI from './components/UI';
import { store } from './state/store';
import './style.css';

export function App() {
    return (
        <Provider store={store}>
            <Three />
            <UI />
        </Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
