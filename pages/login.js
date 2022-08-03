import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { toast } from 'react-toastify';
import { BsFillCheckCircleFill, BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';

import styles from '../styles/login_register.module.css';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.default.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({email: "", password: ""});

  const onChangeHandler = (e)=> {
    e.preventDefault();
    const {name, value} = e.target;
    setUserDetails({...userDetails, [name]: value});
  }

  const onLogin = (e)=> {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(emailRegex.test(userDetails.email) === true && userDetails.password.replace(/\s/g,'').trim().length > 0) {
        dispatch(actionCreators.login(userDetails));
    }
    else {
        if(emailRegex.test(userDetails.email) === false) {
            toast.warn('Enter a valid email!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.warn('Password cannot be empty!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
  }

  useEffect(()=> {
    if(user) {
        router.replace("/");
    }
  }, [user, router]);

  return (
    <div className={styles.wrapper}>
        <Head>
            <title>Login</title>
            <meta name="keywords" content="next, next.js, notes, just-notes, login" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.banner}>
          <div className={styles.heading}>
            <h1>JUST-NOTES</h1>
            <h2>Simple and easy way to keep and manage your notes!</h2>
          </div>

          <div className={styles.features}>
            <div className={styles.flexDiv}>
              <div className={styles.feature}>
                <BsFillCheckCircleFill className={styles.features_icon} />
                <p>Create notes</p>
              </div>

              <div className={styles.feature}>
                <BsFillCheckCircleFill className={styles.features_icon} />
                <p>Format your links</p>
              </div>
            </div>

            <div className={styles.flexDiv}>
              <div className={styles.feature}>
                <BsFillCheckCircleFill className={styles.features_icon} />
                <p>Access anytime</p>
              </div>

              <div className={styles.feature}>
                <BsFillCheckCircleFill className={styles.features_icon} />
                <p>Completely free</p>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.social}>
              <BsInstagram className={styles.social_icon} />
              <BsGithub className={styles.social_icon} />
              <BsLinkedin className={styles.social_icon} />
            </div>

            <div className={styles.footer_content}>
              Created by JustCommunity
            </div>
          </div>
        </div>

        <div className={styles.rightDiv}>
          <div className={styles.form}>
            <h1>Login</h1>
            <input type="email" placeholder='Enter your Email' name="email" value={userDetails.email} onChange={onChangeHandler} />
            <input type="password" placeholder='Enter Password' name="password" value={userDetails.password} onChange={onChangeHandler} />
            <button onClick={onLogin}>Login</button>
            <p>New User? <Link href="/register"><b className={styles.otherText}>Register</b></Link></p>
          </div>
        </div>
        
    </div>
  )
}

export default Login;