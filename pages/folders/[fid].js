import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../../redux';
import { wrapper } from '../../redux/store';
import * as cookie from "cookie";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";

import styles from '../../styles/folderPage.module.css';
import Notes from '../../components/Notes';
import FolderModal from '../../components/FolderModal';

const FolderPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user, theme} = useSelector(state=> state.default.userReducer,shallowEqual);
  const {folder} = useSelector(state=> state.default.foldersReducer,shallowEqual);
//   const {notes} = useSelector(state=> state.default.notesReducer,shallowEqual);
  const [show, setShow] = useState(false);

  const onEditClick = (e)=> {
    e.preventDefault();
    setShow(true);
  }

  const onBack = (e)=> {
    e.preventDefault();
    router.push("/");
  }

  useEffect(()=> {
    if(!user) {
        router.replace("/login");
    }
    else {
        dispatch(actionCreators.getFolder(router.query.fid));
        dispatch(actionCreators.getNotes({id: router.query.fid}));
    }
  }, [user, router, dispatch]);

  return (
    <div className={`${styles.folderPage} ${theme === "dark" && styles.dark_folderPage}`}>
        <Head>
            <title>{folder?.name}</title>
            <meta
              name="keywords"
              content={`next, next.js, notes, just-notes, ${folder?.name}`}
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {show && <FolderModal setShow={setShow} myfolder={folder} />}

        <div className={styles.upperDiv}>
            {/* <h2 className={styles.count}>{notes?.length} notes</h2> */}
            <h1 className={styles.back_btn} onClick={onBack}><MdOutlineKeyboardBackspace /></h1>
            <h1 className={styles.folder_name}>{folder?.name}</h1>
            <h2 className={styles.folder_edit} onClick={onEditClick}><HiMenuAlt2 /></h2>
        </div>

        {(user && folder) && <Notes folder={folder?._id} />}        
    </div>
  )
}

export default FolderPage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
      const { params } = context;
      const mycookie = context?.req?.headers?.cookie || "";
      const cookieObj = cookie.parse(mycookie);
      if (cookieObj.auth_token) {
        await store.dispatch(actionCreators.getFolder(cookieObj.auth_token, params.fid));
        await store.dispatch(actionCreators.getNotes({token: cookieObj.auth_token, id: params.fid}));
      }
    }
  );