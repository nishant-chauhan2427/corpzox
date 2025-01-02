import "./App.css";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "./components/tooltip";
// import { ThemeProvider } from "./components/theme";
import { OnlineStatus } from "./components/onlineStatus";
import { ScrollToTopButton } from "./components/scrollToTop";
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  const {isSignedIn: isSignedInStore} = useSelector((state)=> state.app)
  //const isSignedIn = localStorage.getItem('signedIn');
let userInfo = JSON.parse(localStorage.getItem('userInfo'))?.token;
//console.log(isSignedIn,"Session Storage ");

console.log(isSignedInStore, "isSignedInStore");
if (isSignedInStore === false) {
    let isTabClosed = false;
    window.addEventListener('focus', function() {
        isTabClosed = false;
    });

    window.addEventListener('blur', function() {
        isTabClosed = true;
    });

    document.addEventListener('visibilitychange', function() {
        // When the page becomes hidden (likely due to closing the tab/window)
        if (document.visibilityState === 'hidden' && isTabClosed) {
           console.log("Tab/window is being closed!");
            localStorage.removeItem('userInfo');
        }
    });

}

    
  return (
    // <Provider store={store}>
    //   <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    //     {/* <ThemeProvider> */}
    //       <Outlet />
    //       <Tooltip id="my-tooltip" />
    //       <ScrollToTopButton />
    //       <Toaster />
    //       <OnlineStatus />
    //     {/* </ThemeProvider> */}
    //   </PersistGate>
    // </Provider>
    <>
      
      <Outlet />
          <Tooltip id="my-tooltip" />
           <ScrollToTopButton />
           <Toaster />
           <OnlineStatus />
    </>
  );
}

export default App;
