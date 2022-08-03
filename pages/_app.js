import { useEffect, useState } from "react";
import { wrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {useSelector, shallowEqual} from "react-redux";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const {user} = useSelector(state=> state.default.userReducer,shallowEqual);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(()=> {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {(user && domLoaded) && <Navbar />}
      {domLoaded && <Component {...pageProps} />}
      {domLoaded && <ToastContainer />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
