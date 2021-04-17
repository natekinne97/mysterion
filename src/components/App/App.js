import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import context
// Components
import itemContext from '../../context/itemContext';
// my components
import Menu from '../Menu/Menu';
import Footer from '../Footer/Footer';
import Fonts from '../Fonts'
import Homepage from '../Homepage/Homepage';
// import { Work } from '../Work/Work';
import Contact from '../Contact/Contact';
import About from '../About/About';
// import LandingPage from '../LandingPage/LandingPage';


// shopping
import ShoppingPage from '../ShoppingPage/ShoppingPage';
import Cart from '../Cart/Cart'
import ItemInfo from '../ItemInfo/ItemInfo';

// private route
// import PrivateRoute from '../../routes/private';

// idle and refresh
import TokenService from '../../services/token-services'
import authApi from '../../auth-service/auth-service'
import IdleService from '../../services/idle-services';


class App extends React.Component {
  static contextType = itemContext;
  state = { hasError: false }

  static getDerivedStateFromError (error) {
    console.error(error)
    return { hasError: true }
  }
  componentDidMount () {
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

  componentWillUnmount () {
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


  renderRegularMenu () {
    return (
      <>
        {[ '/', '/work', '/about', '/cart', '/contact',
          '/shop/:id', '/shop' ].map((path, index) => (
            <Route
              key={index ** 4}
              exact
              path={path}
              component={Menu}
            />
          ))}
      </>

    );
  }

  renderFooter () {
    return (
      <>
        {[ '/', '/work', '/about', '/cart', '/contact',
          '/shop/:id', '/shop' ].map((path, index) => (
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


  render () {
    localStorage.lastUrl = window.location.pathname;
    return (
      <div>
        <nav>
          {/* menu goes here */}
          {this.renderRegularMenu()}
          {/* <Menu/> */}


        </nav>
        <main>
          <Switch>
            {/* the landing page */}
            {/* <Route exact path="/landingpage" component={LandingPage} /> */}

            {/* homepage */}
            <Route exact path="/" component={Fonts} />

            {/* work page */}
            {/* <Route exact path="/work" component={Work} /> */}
            {/* for the sake of code reuse i am using the same elements for
          editing and deleting.
          this element takes a parameter for now that says edit and it is a
          boolean value 
          in the future it will be based on whether the component has an auth
          token.
          */}


            {/* render the about page */}
            <Route path="/about" component={About} />

            <Route path="/cart" component={Cart} />

            {/* {render the contact page} */}
            <Route path="/contact" component={Contact} />

            {/* render item info */}
            <Route path="/shop/:id" component={ItemInfo} />

            {/* <Route path="/shop/" component={Fonts} /> */}

            {/* render the shopping page */}
            <Route exact path="/" component={ShoppingPage} />


          </Switch>
        </main>
        <footer className="w-full">
          {/* render the footer */}
          {this.renderFooter()}
        </footer>
      </div>
    );
  }
}

export default App;
