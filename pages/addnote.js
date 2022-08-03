import React from 'react';
import NoteForm from '../components/NoteForm';

import styles from "../styles/addNote.module.css";

const Addnote = () => {
  return (
    <div className={styles.addNote}>
        <NoteForm />
    </div>
  )
}

export default Addnote