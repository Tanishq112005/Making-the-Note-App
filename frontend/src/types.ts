export interface Note {
    note_id: number; // Assuming the backend provides an ID for each note
    note_title: string;
    note_content: string;
  }
  
  export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export interface NotesState {
    notes: Note[];
    loading: boolean;
    error: string | null;
  }

 