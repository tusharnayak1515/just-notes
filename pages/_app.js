import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { wrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import {useSelector, shallowEqual} from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import Nprogress from "nprogress";
Nprogress.configure({ showSpinner: false, easing: 'ease', speed: 1000, parent: 'html' });

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const {user} = useSelector(state=> state.default.userReducer,shallowEqual);
  const [domLoaded, setDomLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    setDomLoaded(true);
  }, []);

  useEffect(()=> {
    Router.events.on("routeChangeStart", ()=> {
      Nprogress.start();
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", ()=> {
      Nprogress.done();
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {loading && <title>Just-Notes</title>}
        <meta name="keywords" content="nextjs, next, notes, just-notes, notes app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <LoadingSpinner />}
      {(user && domLoaded) && <Navbar />}
      {(domLoaded && !loading) && <Component {...pageProps} />}
      {domLoaded && <ToastContainer />}
    </>
  );
}

export default wrapper.withRedux(MyApp);
