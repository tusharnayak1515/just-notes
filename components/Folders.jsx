import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import FolderItem from './FolderItem';

import styles from '../styles/folders.module.css';

const Folders = () => {
  const {folders} = useSelector(state=> state.default.foldersReducer,shallowEqual);
  return (
    <div className={styles.folders}>
        {folders && folders?.length === 0 ? <h1 className={styles.onFolders}>No Folders!</h1> : folders?.map((folder)=> {
            return <FolderItem key={folder._id} folder={folder} />
        })}
    </div>
  )
}

export default Folders;