import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import { ThemeProvider } from 'styled-components';
import config from "./config";
import App from './App';

const theme = {
    primaryColor: '#e7e7e7'
    ,spacing: '5vh'
    ,shadow: '3px 3px 5px 0px #888888'
    ,borderRadius: '3px'
};

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
    // ,Storage: {
    //     region: config.s3.REGION,
    //     bucket: config.s3.BUCKET,
    //     identityPoolId: config.cognito.IDENTITY_POOL_ID
    // }
    ,API: {
        endpoints: [{
            name: "compare-yourself",
            endpoint: config.apiGateway.URL,
            region: config.apiGateway.REGION
        }, ]
    }
});

ReactDOM.render(
    <Router>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </Router>, 
    document.getElementById('root'));
