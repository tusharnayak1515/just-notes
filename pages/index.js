import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { useRouter } from "next/router";
import { wrapper } from "../redux/store";
import * as cookie from "cookie";
import { actionCreators } from "../redux";
import { HiFolderAdd, HiOutlineFolderAdd } from "react-icons/hi";

import styles from "../styles/Home.module.css";
import Folders from "../components/Folders";
import FolderModal from "../components/FolderModal";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, theme } = useSelector(state => state.default.userReducer,shallowEqual);
  const { folders } = useSelector(state => state.default.foldersReducer,shallowEqual);
  const [show, setShow] = useState(false);

  const onAddClick = (e) => {
    e.preventDefault();
    setShow(true);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      dispatch(actionCreators.profile());
      dispatch(actionCreators.getFolders());
    }
  }, [user, router, dispatch]);

  return (
    <>
      {show && <FolderModal setShow={setShow} />}
      <div
        className={theme === "light" ? styles.container : styles.dark_container}
      >
        <Head>
          <title>Just-Notes</title>
          <meta name="keywords" content="next, next.js, notes, just-notes" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.topDiv}>
            <h3 className={styles.count}>
              {folders?.length} {folders?.length === 1 ? "folder" : "folders"}
            </h3>
            <h2 className={styles.title}>My Folders</h2>
            <h1 className={styles.add_folder} onClick={onAddClick}>
              {theme === "light" ? <HiFolderAdd /> : <HiOutlineFolderAdd />}
            </h1>
          </div>

          {user && folders && <Folders />}
        </main>
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    if (cookieObj.auth_token) {
      await store.dispatch(actionCreators.profile(cookieObj.auth_token));
      await store.dispatch(actionCreators.getFolders(cookieObj.auth_token));
    }
  }
);