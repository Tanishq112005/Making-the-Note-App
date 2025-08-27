import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/apiService';
import type { Note, NotesState } from '../../types';

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};


const getToken = () => localStorage.getItem('jwt_token');


export const fetchNotes = createAsyncThunk(
    'notes/fetchNotes',
    async (_, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found');
            const response : any = await api.post('/getting_notes', { jwt_token: token });
            return response.data.data_of_all_notes;
        } catch (error: any) {
            return rejectWithValue(error.response.data.reason || 'Failed to fetch notes');
        }
    }
);

export const createNote = createAsyncThunk(
    'notes/createNote',
    async (noteData: { title: string; description: string }, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found');
            await api.post('/creating_notes', { ...noteData, jwt_token: token });
            return noteData; 
        } catch (error: any) {
            return rejectWithValue(error.response.data.reason || 'Failed to create note');
        }
    }
);



export const updateNote = createAsyncThunk(
    'notes/updateNote',
    async (note: Note, { rejectWithValue }) => {
        try {
            const token = getToken();
            if (!token) return rejectWithValue('No token found');
            await api.post('/updating_notes', {
                notes_id : note.note_id , 
                title : note.note_title , 
                descripiton : note.note_content
            });
            return note;
        } catch (error: any) {
            return rejectWithValue(error.response.data.reason || 'Failed to update note');
        }
    }
);

export const deleteNote = createAsyncThunk(
    'notes/deleteNote',
    async (noteId: number, { rejectWithValue }) => {
        try {
            await api.post('/deleting_notes', {note_id: noteId});
            return noteId;
        } catch (error: any) {
            return rejectWithValue(error.response.data.reason || 'Failed to delete note');
        }
    }
);


const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.loading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        
            .addCase(createNote.fulfilled, (state) => {
             
                state.loading = false;
            })
            
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                const index = state.notes.findIndex(note => note.note_id === action.payload.note_id);
                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })

            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<number>) => {
                state.notes = state.notes.filter(note => note.note_id !== action.payload);
            });
    },
});

export default notesSlice.reducer;