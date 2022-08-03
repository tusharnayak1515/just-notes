import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import NoteItem from './NoteItem';

import styles from '../styles/notes.module.css';

const Notes = () => {
  const {notes} = useSelector(state=> state.default.notesReducer,shallowEqual);
  return (
    <div className={styles.notes}>
        {notes && notes?.length === 0 ? <h1 className={styles.noNotes}>No Notes!</h1> : notes?.map((note)=> {
            return <NoteItem key={note._id} note={note} />
        })}
    </div>
  )
}

export default Notes;