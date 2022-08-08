import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { actionCreators } from "../redux";
import { wrapper } from "../redux/store";
import * as cookie from "cookie";
import logoImage from "../public/static/images/just_logo.png";
import { FaUserEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import styles from "../styles/profile.module.css";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile, theme } = useSelector(state => state.default.userReducer,shallowEqual);
  const { folders } = useSelector(state => state.default.foldersReducer,shallowEqual);
  const { allNotes } = useSelector(state => state.default.notesReducer,shallowEqual);
  const [isEdit, setIsEdit] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: profile?.name,
    email: profile?.email,
  });

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const onEdit = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (
      userDetails.name.length >= 4 &&
      userDetails.name.length <= 25 &&
      regex.test(userDetails.email) === true
    ) {
      dispatch(actionCreators.editProfile(userDetails));
      setIsEdit(false);
    } else {
      if (userDetails.name.length < 4 || userDetails.name.length > 25) {
        toast.warn("Name must be minimum 4 and maximum 24 characters long!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.warn("Enter a valid email!", {
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
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getFolders());
      dispatch(actionCreators.getAllNotes());
    }
  }, [user, router, dispatch]);

  return (
    <div
      className={`${styles.profile} ${theme === "dark" && styles.dark_profile}`}
    >
      <Head>
        <title>Profile - {profile?.name}</title>
        <meta
          name="keywords"
          content={`next, next.js, notes, just-notes, profile ,${profile?.name}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.profile_head}>
        Profile{" "}
        <span onClick={toggleEdit}>
          <FaUserEdit />
        </span>
      </h1>
      <div
        className={`${styles.profile_container} ${styles.dark_profile_container}`}
      >
        <div className={styles.logo_box}>
          <Image src={logoImage} />
          <h2>{profile?.name?.split(" ")[0]}</h2>
          <h3 className={styles.counts}><span>{folders?.length} folders</span> | <span>{allNotes?.length} notes</span></h3>
        </div>

        <input
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
          value={userDetails.name}
          onChange={onChangeHandler}
          disabled={!isEdit}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={onChangeHandler}
          disabled={!isEdit}
        />
        {isEdit && <button onClick={onEdit} className={styles.editBtn}>Edit</button>}
        {isEdit && <button onClick={onCancel} className={styles.cancelBtn}>Cancel</button>}
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.auth_token) {
      await store.dispatch(actionCreators.profile(cookieObj.auth_token));
      await store.dispatch(actionCreators.getFolders(cookieObj.auth_token));
      await store.dispatch(actionCreators.getAllNotes(cookieObj.auth_token));
    }
  }
);
