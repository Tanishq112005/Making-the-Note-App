export interface Note {
    note_id: number; 
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

 