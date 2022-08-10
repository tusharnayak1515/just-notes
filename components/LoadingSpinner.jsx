import React from 'react';
import Image from 'next/image';
import loadingSpinner from "../public/static/images/loading.svg";

import styles from "../styles/loading.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loading}>
        <Image src={loadingSpinner} alt="Loading Spinner" />
    </div>
  )
}

export default LoadingSpinner;