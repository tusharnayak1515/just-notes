import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NoteForm from '../../components/NoteForm';
import { shallowEqual, useSelector } from 'react-redux';

import styles from "../../styles/addNote.module.css";

const Addnote = () => {
  const router = useRouter();
  const {user, theme} = useSelector(state=> state.default.userReducer,shallowEqual);

  useEffect(()=> {
    if(!user) {
        router.replace("/");
    }
  }, [user, router]);

  return (
    <div className={`${styles.addNote} ${theme === "light" ? styles.light_addNote : styles.dark_addNote}`}>
        <Head>
            <title>Add Note</title>
            <meta
              name="keywords"
              content={"next, next.js, notes, just-notes"}
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <NoteForm folder={router.query.folder} />
    </div>
  )
}

export default Addnote