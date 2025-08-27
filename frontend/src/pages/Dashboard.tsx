import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import type { AppDispatch, RootState } from '../app/store';
import { createNote, fetchNotes, deleteNote, updateNote } from '../features/notes/noteSlice'; 
import { logout } from '../features/auth/authSlice'; 
import '../styles/Notes.css';
import '../styles/Forms.css';
import { RxCross2 } from 'react-icons/rx'; 
import { FaPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi'; 
import type { Note } from '../types';

const Dashboard: React.FC = () => {

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { notes, loading, error } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/");     
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewNoteTitle('');
    setNewNoteContent('');
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    dispatch(createNote({ title: newNoteTitle, description: newNoteContent })).then(() => {
      dispatch(fetchNotes());
    });
    handleCloseCreateModal();
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };


  const handleOpenEditModal = (note: Note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      dispatch(updateNote({
        note_id: editingNote.note_id,
        note_title: editingNote.note_title,
        note_content: editingNote.note_content,
      }));
      handleCloseEditModal();
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>My Notes</h1>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <span>Logout</span>
            <FiLogOut size={22} />
          </button>
        </header>
        
        {loading && <p>Loading notes...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className="notes-grid">
          {notes && notes.length > 0 ? (
            notes.map((note: Note) => (
              <div key={note.note_id} className="note-card">
                <h3>{note.note_title}</h3>
                <p>{note.note_content}</p>
                <div className="note-actions">
                  <button className="btn-edit" onClick={() => handleOpenEditModal(note)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => handleDeleteNote(note.note_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="no-notes-message">Your notebook is empty. Click the '+' button to create your first note!</p>
          )}
        </div>
      </div>

     
      <button className="add-note-fab" onClick={handleOpenCreateModal} title="Add New Note">
        <FaPlus size={24} />
      </button>

      
      {isCreateModalOpen && (
 
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseCreateModal}>
              <RxCross2 size={24} />
            </button>
            <form onSubmit={handleCreateNote}>
              <h3>Add New Note</h3>
              <div className="form-group">
                <label htmlFor="new-note-title">Title</label>
                <input
                  id="new-note-title"
                  type="text"
                  placeholder="Note Title"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-note-content">Content</label>
                <textarea
                  id="new-note-content"
                  placeholder="Today I want to..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  required
                  rows={6}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Create Note</button>
            </form>
          </div>
        </div>
      )}


      {isEditModalOpen && editingNote && (
       
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseEditModal}>
              <RxCross2 size={24} />
            </button>
            <form onSubmit={handleSaveChanges}>
              <h3>Edit Note</h3>
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>
                <input
                  id="edit-title"
                  type="text"
                  value={editingNote.note_title}
                  onChange={(e) => setEditingNote({ ...editingNote, note_title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-content">Content</label>
                <textarea
                  id="edit-content"
                  value={editingNote.note_content}
                  onChange={(e) => setEditingNote({ ...editingNote, note_content: e.target.value })}
                  required
                  rows={6}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;