import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import AppWithAuth from './AppWithAuth';
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Amplify from '@aws-amplify/core';
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

// Amplify.configure({
//     ...aws_exports,
//     Analytics: { 
//       disabled: true,
//     }, 
//   });

const store = configureStore();

const app = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
            {/* <AppWithAuth /> */}
        </BrowserRouter>
    </ReduxProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();