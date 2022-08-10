import React from 'react';
import Image from 'next/image';
import { shallowEqual, useSelector } from 'react-redux';
import loadingSpinner from "../public/static/images/loading.svg";
import loadingSpinner1 from "../public/static/images/loading1.svg";

import styles from "../styles/loading.module.css";

const LoadingSpinner = () => {
  const {theme} = useSelector(state=> state.default.userReducer, shallowEqual);
  return (
    <div className={styles.loading} style={{backgroundColor: theme === "dark" && "#010125"}}>
        <Image src={theme === "light" ? loadingSpinner : loadingSpinner1} alt="Loading Spinner" />
    </div>
  )
}

export default LoadingSpinner;