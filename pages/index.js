import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { wrapper } from '../redux/store';
import * as cookie from 'cookie';
import { actionCreators } from '../redux';
import { BsFillMoonFill } from 'react-icons/bs';
import Notes from '../components/Notes';

import styles from '../styles/Home.module.css';

const Home = ()=> {
  const router = useRouter();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.default.userReducer,shallowEqual);
  const {notes} = useSelector(state=> state.default.notesReducer,shallowEqual);

  useEffect(()=> {
    if(user === null) {
      router.replace("/login");
    }
    else {
      dispatch(actionCreators.getNotes());
    }
  }, [user, router, dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Just-Notes</title>
        <meta name="keywords" content="next, next.js, notes, just-notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.topDiv}>
          <div className={styles.title}>
            <h1>My Notes</h1>
          </div>

          <div className={styles.info}>
              <h3>{notes?.length} notes</h3>
              <h3><BsFillMoonFill className={styles.mode_icon} /></h3>
          </div>
        </div>

        {(user && notes) && <Notes />}

      </main>
    </div>
  )
}

export default Home;

export const getServerSideProps = wrapper.getServerSideProps((store)=> async (context)=> {
  const mycookie = context?.req?.headers?.cookie || "";
  const cookieObj = cookie.parse(mycookie);
  if(cookieObj.auth_token) {
    await store.dispatch(actionCreators.getNotes(cookieObj.auth_token));
  }
});