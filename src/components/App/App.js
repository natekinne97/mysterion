import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import context
// Components
import LoginPage from '../../routes/LoginPage'
import CreatePage from '../../routes/CreatePage';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Reset from '../Reset/Reset';
import itemContext from '../../context/itemContext';
// my components
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Homepage from '../Homepage/Homepage';
import Work from '../Work/Work';
import Contact from '../Contact/Contact';
import About from '../About/About';

// shopping
import ShoppingPage from '../ShoppingPage/ShoppingPage';
import ItemInfo from '../ItemInfo/ItemInfo';
import Cart from '../Cart/Cart';
// private route
// import PrivateRoute from '../../routes/private';

// idle and refresh
import TokenService from '../../services/token-services'
import authApi from '../../auth-service/auth-service'
import IdleService from '../../services/idle-services';


// admin side
import AdminMenu from '../../adminComponents/AdminMenu/AdminMenu';

class App extends React.Component {
  static contextType = itemContext;
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }
  componentDidMount() {
    try {
      /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
      IdleService.setIdleCallback(this.logoutFromIdle)

      /* if a user is logged in */
      if (TokenService.hasAuthToken()) {
        /*
          tell the idle service to register event listeners
          the event listeners are fired when a user does something, e.g. move their mouse
          if the user doesn't trigger one of these event listeners,
            the idleCallback (logout) will be invoked
        */
        IdleService.regiserIdleTimerResets()

        /*
          Tell the token service to read the JWT, looking at the exp value
          and queue a timeout just before the token expires
        */
        TokenService.queueCallbackBeforeExpiry(() => {
          /* the timoue will call this callback just before the token expires */
          authApi.postRefreshToken()
        })
      }
    } catch (error) {
      console.log(error, 'error occured');
    }
  }

  componentWillUnmount() {
    try {
      /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
      */
      IdleService.unRegisterIdleResets()
      /*
        and remove the refresh endpoint request
      */
      TokenService.clearCallbackBeforeExpiry()
    } catch (error) {
      console.log(error, 'error logging out')
    }

  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken()
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry()
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets()
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate()
  }

  renderAdminMenu(){
    return (
      <>
        {['/admin-stuff'].map((path, index)=>(
          <Route
            key={index}
            exact
            path={path}
            component={AdminMenu}
          />
        ))}
      </>
    );
  }


  render() {
    localStorage.lastUrl = window.location.pathname;
    return (
      <div>
        <nav>
         {/* menu goes here */}
         <Menu/>
         {/* render the admin menu */}
         {this.renderAdminMenu()}
        </nav>
        <main>
          <Switch>
            {/* homepage */}
            <Route exact path="/" component={Homepage} />

            {/* work page */}
          <Route
            path="/work"
            component={Work}
          />
           {/* render the about page */}
           <Route
            path="/about"
            component={About}
           />

          <Route 
            path="/cart"
            component={Cart}
          />

            {/* {render the contact page} */}
            <Route 
              path="/contact"
              component={Contact}
              />

            {/* render item info */}
            <Route
              path="/shop/:id"
              component={ItemInfo}
            />

            {/* render the shopping page */}
            <Route
              exact
              path="/shop"
              component={ShoppingPage}
            />


            
            {/* login route */}
            <Route
              path="/login"
              component={LoginPage}
            />
            {/* signup */}
            {/* <Route
              path="/signup"
              component={CreatePage}
            /> */}

            {/* forgot password */}
            <Route
              path='/forgot-password'
              component={ForgotPassword}
            />
            {/* reset password */}
            <Route
              path='/reset/:token'
              component={Reset}
            />
          </Switch>
          
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    );
  }
}

export default App;
