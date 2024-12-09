import React, { Component, Suspense } from 'react';
import Layout from './components/Layout/';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import '@aws-amplify/ui/dist/style.css';
import { withAuthenticator, SignOut } from 'aws-amplify-react';

// Import Css
import './Apps.scss';
import './assets/css/materialdesignicons.min.css';
import './assets/css/colors/default.css';

// Include Routes 
import routes from './routes';

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {  
    render() {
      return <Layout>
        {/* <SignOut /> */}
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}

class App extends Component {
  signOut = async () => {
    await Auth.signOut()
    this.props.rerender()
  }
  Loader = () => {
    return (
      <div id="preloader">
          <div id="status">
              <div className="spinner">
                  <div className="double-bounce1"></div>
                  <div className="double-bounce2"></div>
              </div>
          </div>
      </div>
    );
}
  render() {

    return (
      <React.Fragment>  
      <Router>
        <Suspense fallback = {this.Loader()} >
            <Switch>
            {routes.map((route, idx) =>
                route.isWithoutLayout ?
                  <Route path={route.path} exact={route.exact} component={route.component} key={idx} />
                :
                  <Route path={route.path} exact component={withLayout(route.component)} key={idx} />
            )}
            </Switch>
            </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

// export default withRouter(App);
// const signUpConfig = {
//   header: 'Create an Account',
//   hideAllDefaults: true,
//   defaultCountryCode: '1',
//   signUpFields: [
//     {
//       label: 'First Name',
//       key: 'given_name',
//       required: true,
//       displayOrder: 1,
//       type: 'string'
//     },
//     {
//       label: 'Last Name',
//       key: 'family_name',
//       required: true,
//       displayOrder: 2,
//       type: 'string'
//     },
//     {
//       label: 'Email',
//       key: 'username',
//       required: true,
//       displayOrder: 3,
//       type: 'string'
//     },
//     {
//       label: 'Password',
//       key: 'password',
//       required: true,
//       displayOrder: 3,
//       type: 'password'
//     },
//     {
//       label: 'Phone number',
//       key: 'phone_number',
//       required: true,
//       displayOrder: 5,
//       type: 'string'
//     },
//     {
//       label: 'Nick Name',
//       key: 'nickname',
//       required: true,
//       displayOrder: 5,
//       type: 'string'
//     },
//     {
//       label: 'Pic',
//       key: 'picture',
//       required: true,
//       displayOrder: 5,
//       type: 'string'
//     }
//   ]
// };
export default withRouter(App)
// export default withAuthenticator(withRouter(App), { 
//   includeGreetings: false ,
//   signUpConfig
// });