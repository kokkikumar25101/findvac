import React from "react";
import { SignIn } from "aws-amplify-react";
import config from "./aws-exports";
import { CustomSignIn } from "./pages/Auth/CustomSignIn";
import App from "./App";
// import { Authenticator } from "aws-amplify-react/dist/Auth";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

class AppWithAuth extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <AmplifyAuthenticator hide={[SignIn]} amplifyConfig={config}>
          <CustomSignIn />
          <App />
        </AmplifyAuthenticator>
      </div>
    );
  }
}

export default AppWithAuth;