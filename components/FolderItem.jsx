import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';
import lightFolder from "../public/static/images/light_folder1.svg";
import darkFolder from "../public/static/images/dark_folder.svg";

import styles from '../styles/folderItem.module.css';

const FolderItem = ({folder}) => {
  const router = useRouter();
  const {theme} = useSelector(state=> state.default.userReducer,shallowEqual);

  const onFolderClick = (e)=> {
    e.preventDefault();
    router.push(`/folders/${folder._id}`);
  }

  return (
    <div className={`${styles.folder_item} ${theme === "dark" && styles.dark_folderItem}`} onClick={onFolderClick}>
      <Image src={theme === "light" ? lightFolder : lightFolder} alt="Folder" />
      <p>{folder.name.substring(0,8)}</p>
    </div>
  )
}

export default FolderItem;