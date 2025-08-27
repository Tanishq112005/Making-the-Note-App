import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { createNote, fetchNotes, deleteNote } from '../features/notes/noteSlice';
import '../styles/Notes.css';
import '../styles/Forms.css';

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading, error } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createNote({ title : title, description : content })).then(() => {
      dispatch(fetchNotes());
    });
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className="container dashboard">
      <h1>My Notes</h1>
      
      <form onSubmit={handleCreateNote} className="create-note-form auth-form">
        <h3>Create a New Note</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            style={{width: '100%', padding: '10px', boxSizing: 'border-box'}}
          ></textarea>
        </div>
        <button type="submit" className="auth-button">Create Note</button>
      </form>
      
      {loading && <p>Loading notes...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <div className="notes-grid">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.note_id} className="note-card">
              <h3>{note.note_title}</h3>
              <p>{note.note_content}</p>
              <div className="note-actions">
                  {/* Update functionality can be added here */}
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>You haven't created any notes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;