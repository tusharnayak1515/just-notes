import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { toast } from 'react-toastify';
import { BsFillCheckCircleFill, BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';

import styles from '../styles/login_register.module.css';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.default.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({name: "", email: "", password: ""});

  const onChangeHandler = (e)=> {
    e.preventDefault();
    const {name, value} = e.target;
    setUserDetails({...userDetails, [name]: value});
  }

  const onRegister = (e)=> {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    if((userDetails.name.length >= 4 && userDetails.name.length <= 25) && emailRegex.test(userDetails.email) === true && passwordRegex.test(userDetails.password)) {
      dispatch(actionCreators.register(userDetails));
  }
    else {
        if(userDetails.name.length < 4 || userDetails.name.length > 25) {
            toast.warn('Name must be minimum 4 and maximum 25 characters long!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if(userDetails.email.length === 0 || emailRegex.test(userDetails.email) === false) {
          toast.warn('Enter a valid Email!', {
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
          toast.warn('Password must be minimum 8 characters long and a combination of uppercase,lowercase,spacial characters and numbers!', {
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
            <title>Register</title>
            <meta name="keywords" content="next, next.js, notes, just-notes, register" />
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
            <h1>Register</h1>
            <input type="email" placeholder='Enter Name' name="name" value={userDetails.email} onChange={onChangeHandler} />
            <input type="email" placeholder='Enter your Email' name="email" value={userDetails.email} onChange={onChangeHandler} />
            <input type="password" placeholder='Enter Password' name="password" value={userDetails.password} onChange={onChangeHandler} />
            <button onClick={onRegister}>Register</button>
            <p>Have an account? <Link href="/login"><b className={styles.otherText}>Login</b></Link></p>
          </div>
        </div>
        
    </div>
  )
}

export default Register;