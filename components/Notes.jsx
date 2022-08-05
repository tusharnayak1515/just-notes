import React from 'react';
import { useRouter } from 'next/router';
import { shallowEqual, useSelector } from 'react-redux';
import NoteItem from './NoteItem';
import { MdAdd } from 'react-icons/md';

import styles from '../styles/notes.module.css';

const Notes = ({folder}) => {
  const router = useRouter();
  const {theme} = useSelector(state=> state.default.userReducer,shallowEqual);
  const {notes} = useSelector(state=> state.default.notesReducer,shallowEqual);

  const onAddClick = (e)=> {
    e.preventDefault();
    router.push(`/addnote/${folder}`);
  }

  return (
    <div className={`${styles.notes} ${theme === "dark" && styles.dark_notes}`}>
        {notes && notes?.map((note)=> {
            return <NoteItem key={note._id} note={note} />
        })}
        <div className={styles.add_note_btn}>
          <h1 onClick={onAddClick}><MdAdd /></h1>
        </div>
    </div>
  )
}

export default Notes;