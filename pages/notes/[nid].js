import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux";
import * as cookie from "cookie";
import { wrapper } from "../../redux/store";

import styles from "../../styles/notePage.module.css";
import NoteForm from "../../components/NoteForm";

const Note = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, theme } = useSelector(state => state.default.userReducer,shallowEqual);
  const { note } = useSelector(state => state.default.notesReducer,shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
        if (router.isReady) {
            dispatch(actionCreators.getNote(router.query.nid));
        }
    }
    return () => {
      dispatch(actionCreators.resetNote());
    };
  }, [user, router, dispatch]);

  return (
    <div className={`${styles.note_container} ${theme === "light" ? styles.light_container : styles.dark_container}`}>
      <Head>
        <title>{note?.title}</title>
        <meta
          name="keywords"
          content={`next, next.js, notes, just-notes, ${note?.title}, ${note?.description}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NoteForm note={note} />
    </div>
  );
};

export default Note;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const mycookie = context?.req?.headers?.cookie || "";
    const cookieObj = cookie.parse(mycookie);
    const { params } = context;
    if (params.nid && cookieObj.auth_token) {
      await store.dispatch(
        actionCreators.getNote(params.nid, cookieObj.auth_token)
      );
    }
  }
);
