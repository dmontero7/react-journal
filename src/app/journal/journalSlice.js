import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
        // : {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: []//https:img1.jpg, https:img2.jpg 
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved ='';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved ='';
        },
        updatedNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id === action.payload.id) {
                     return action.payload;
                }
                return note;
            })
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote:(state,action)=>{
            state.activeNote.imageUrls = [...state.activeNote.imageUrls,...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving= false,
            state.messageSaved= '',
            state.notes= [],
            state.activeNote= null
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter((note) => note.id !== action.payload);
            state.activeNote=null;
            //se debe borrar la imagen de cloudinary pero la recomendacion es hacerlo por backend
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updatedNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById } = journalSlice.actions