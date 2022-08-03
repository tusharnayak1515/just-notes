import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { actionCreators } from '../redux';
import { DiJavascript } from 'react-icons/di';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import { CgNotes } from 'react-icons/cg';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onAddClick = (e)=> {
    e.preventDefault();
    router.push("/addnote");
  }

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logoDiv}>
            <DiJavascript className={styles.logoIcon}  />
            <span className={styles.logo}>Just Notes</span>
        </div>

        <div className={`${styles.menu_container} ${styles.top}`}>
            <div className={styles.menuDiv} style={{color: router.pathname === "/" ? "aqua" : "white"}}>
                <CgNotes className={styles.menu_icons} />
                <Link href="/"><span>My Notes</span></Link>
            </div>

            <div className={styles.menuDiv} style={{color: router.pathname === "/todo" ? "aqua" : "white"}}>
                <AiOutlineCheck className={styles.menu_icons} />
                <Link href="/todo"><span>To-Do List</span></Link>
            </div>

            <div className={styles.menuDiv} style={{color: router.pathname === "/profile" ? "aqua" : "white"}}>
                <FaUserAlt className={styles.menu_icons} />
                <Link href="/profile"><span>Profile</span></Link>
            </div>
        </div>

        <div className={`${styles.menu_container} ${styles.bottom}`}>
            <div className={styles.menuDiv}>
                <IoMdAdd className={`${styles.menu_icons} ${styles.addIcon}`} />
                <span onClick={onAddClick}>Add</span>
            </div>

            <div className={styles.menuDiv}>
                <BiLogOut className={styles.menu_icons} />
                <span onClick={onLogout}>Logout</span>
            </div>
        </div>
        <footer>
            © JustCommunity
        </footer>
    </div>
  )
}

export default Navbar;