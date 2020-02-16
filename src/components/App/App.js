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
import {Work} from '../Work/Work';
import Contact from '../Contact/Contact';
import About from '../About/About';
import LandingPage from '../LandingPage/LandingPage';

// shopping
import ShoppingPage from '../ShoppingPage/ShoppingPage';
import ItemInfo from '../ItemInfo/ItemInfo';

// private route
// import PrivateRoute from '../../routes/private';

// idle and refresh
import TokenService from '../../services/token-services'
import authApi from '../../auth-service/auth-service'
import IdleService from '../../services/idle-services';


// admin side
import AdminMenu from '../../adminComponents/AdminMenu/AdminMenu';
import NewsLetter from '../../adminComponents/NewsLetters/NewsLetters';
import EditLP from '../../adminComponents/EditLP/EditLP';

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
        {['/admin-stuff', '/admin-stuff/work', '/admin-stuff/items',
          '/admin-stuff/items/:id', '/admin-stuff/letters',
          '/admin-stuff/landingpage', '/admin-stuff/highlights',
          '/admin-stuff/stats'].map((path, index)=>(
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

  renderRegularMenu(){
    return(
      <>
        {['/', '/work', '/about', '/cart', '/contact', 
        '/shop/:id', '/shop'].map((path, index)=>(
          <Route
            key={index**4}
            exact
            path={path}
            component={Menu}
          />
        ))}
      </>

    );
  }

  renderFooter(){
    return (
      <>
        {['/', '/work', '/about', '/cart', '/contact',
          '/shop/:id', '/shop'].map((path, index) => (
            <Route
              key={index ** 3}
              exact
              path={path}
              component={Footer}
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
          {this.renderRegularMenu()}
          {/* <Menu/> */}
          {/* render the admin menu */}
          {this.renderAdminMenu()}
          {/* renders only on the admin side */}
        </nav>
        <main>
          <Switch>
            {/* the landing page */}
            <Route exact path="/landingpage" component={LandingPage} />

            <Route path="/admin-stuff/landingpage" component={EditLP} />

            {/* homepage */}
            <Route exact path="/" component={Homepage} />

            {/* work page */}
            <Route exact path="/work" component={Work} />
            {/* for the sake of code reuse i am using the same elements for
          editing and deleting.
          this element takes a parameter for now that says edit and it is a
          boolean value 
          in the future it will be based on whether the component has an auth
          token.
          */}
            <Route exact path="/admin-stuff/work">
              <Work edit={true} />
            </Route>
            {/*  */}
            <Route exact path="/admin-stuff/highlights">
              <Work edit={true} highlights={true} />
            </Route>
            {/* render the about page */}
            <Route path="/about" component={About} />

            <Route path="/cart" component={ShoppingPage} />

            {/* {render the contact page} */}
            <Route path="/contact" component={Contact} />

            {/* render item info */}
            <Route path="/shop/:id" component={ItemInfo} />

            <Route
              path="/admin-stuff/items/:id"
              render={props => <ItemInfo {...props} edit={true} />}
            />

            {/* render the shopping page */}
            <Route exact path="/shop" component={ShoppingPage} />

            <Route exact path="/admin-stuff/items">
              <ShoppingPage edit={true} />
            </Route>

            {/* renders the news letter page for creating and sending new letters */}
            <Route path="/admin-stuff/letters" component={NewsLetter} />

            {/* login route */}
            <Route path="/admin-stuff/login" component={LoginPage} />
            {/* signup */}
            {/* <Route
              path="/signup"
              component={CreatePage}
            /> */}

            {/* forgot password */}
            <Route
              path="/admin-stuff/forgot-password"
              component={ForgotPassword}
            />
            {/* reset password */}
            <Route path="/admin-stuff/reset/:token" component={Reset} />
          </Switch>
        </main>
        <footer>
          {/* render the footer */}
          {this.renderFooter()}
        </footer>
      </div>
    );
  }
}

export default App;
