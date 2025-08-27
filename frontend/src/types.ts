export interface Note {
    id: string; // Assuming the backend provides an ID for each note
    title: string;
    content: string;
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