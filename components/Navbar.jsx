import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { actionCreators } from "../redux";
import { DiJavascript } from "react-icons/di";
import { FaUserAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
// import { AiOutlineCheck } from 'react-icons/ai';
import { CgNotes } from "react-icons/cg";
import { BsFillMoonFill, BsSun } from "react-icons/bs";

import styles from "../styles/navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useSelector(
    (state) => state.default.userReducer,
    shallowEqual
  );

  const onAddClick = (e) => {
    e.preventDefault();
    router.push("/addnote");
  };

  const toggleMode = (e) => {
    e.preventDefault();
    dispatch(actionCreators.toggleTheme());
  };

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(actionCreators.logout());
  };

  return (
    <div className={theme === "light" ? styles.navbar : styles.dark_navbar}>
      <div className={styles.logoDiv}>
        <DiJavascript className={styles.logoIcon} />
        <span className={styles.logo}>Just Notes</span>
      </div>

      <div className={`${styles.menu_container} ${styles.top}`}>
        <div className={styles.menuDiv}>
          <CgNotes
            className={styles.menu_icons}
            style={{ 
                fontWeight: router.pathname === "/" ? "bold" : "normal", 
                color: (router.pathname === "/" && theme === "dark") && "aqua" }}
          />
          <Link href="/">
            <span
              style={{
                fontWeight: router.pathname === "/" ? "bold" : "normal",
                color: (router.pathname === "/" && theme === "dark") && "aqua"
              }}
            >
              My Notes
            </span>
          </Link>
        </div>

        <div className={styles.menuDiv}>
          <FaUserAlt
            className={styles.menu_icons}
            style={{
              fontWeight: router.pathname === "/profile" ? "bold" : "normal",
              color: (router.pathname === "/profile" && theme === "dark") && "aqua"
            }}
          />
          <Link href="/profile">
            <span
              style={{
                fontWeight: router.pathname === "/profile" ? "bold" : "normal",
                color: (router.pathname === "/profile" && theme === "dark") && "aqua"
              }}
            >
              Profile
            </span>
          </Link>
        </div>

        <div className={styles.menuDiv}>
          {theme === "dark" ? (
            <BsFillMoonFill className={styles.menu_icons} />
          ) : (
            <BsSun className={styles.menu_icons} />
          )}
          <span onClick={toggleMode} className={styles.modeBtn}>
            {theme === "light" ? "Light" : "Dark"} Mode
          </span>
        </div>

        <div className={styles.menuDiv}>
          <IoMdAdd className={`${styles.menu_icons} ${styles.addIcon}`} />
          <span onClick={onAddClick}>Add</span>
        </div>

        <div className={styles.menuDiv}>
          <BiLogOut className={styles.menu_icons} />
          <span onClick={onLogout}>Logout</span>
        </div>
      </div>

      {/* <div className={`${styles.menu_container} ${styles.bottom}`}>
            <div className={styles.menuDiv}>
                <IoMdAdd className={`${styles.menu_icons} ${styles.addIcon}`} />
                <span onClick={onAddClick}>Add</span>
            </div>

            <div className={styles.menuDiv}>
                <BiLogOut className={styles.menu_icons} />
                <span onClick={onLogout}>Logout</span>
            </div>
        </div> */}
      {/* <div className={styles.footer}>
            © JustCommunity
        </div> */}
    </div>
  );
};

export default Navbar;
