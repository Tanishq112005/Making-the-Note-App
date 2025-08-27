import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../app/store';
import { createNote, fetchNotes, deleteNote, updateNote } from '../features/notes/noteSlice'; 
import '../styles/Notes.css';
import '../styles/Forms.css';
import { RxCross2 } from 'react-icons/rx'; // Import the close icon
import { FaPlus } from 'react-icons/fa'; // Import the plus icon
import type { Note } from '../types';

const Dashboard: React.FC = () => {
  // State for the create note form
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // State for controlling the 'create new note' modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // State for controlling the 'edit note' modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State to hold the note currently being edited
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { notes, loading, error } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // --- Create Note Functions ---
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewNoteTitle(''); // Clear form on close
    setNewNoteContent(''); // Clear form on close
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return; // Basic validation
    // Assuming your createNote payload uses 'title' and 'description'
    dispatch(createNote({ title: newNoteTitle, description: newNoteContent })).then(() => {
      dispatch(fetchNotes()); // Refetch notes after creation
    });
    handleCloseCreateModal(); // Close modal after creation
  };

  const handleDeleteNote = (id: number) => {
    dispatch(deleteNote(id));
  };

  // --- Edit Note Modal Functions ---
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
          {/* Floating Action Button for adding notes */}
          <button className="add-note-fab" onClick={handleOpenCreateModal} title="Add New Note">
            <FaPlus size={24} />
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

      {/* --- CREATE NEW NOTE MODAL --- */}
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

      {/* --- EDIT NOTE MODAL --- */}
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