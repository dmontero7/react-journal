import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        const { uid } = getState().authSlice;
        const newNote = {
            title: '',
            body: '',
            imageUrls:[],
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().authSlice;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().authSlice;
        const { activeNote } = getState().journal;
        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch(updatedNote(activeNote));
    }
}

export const startUploadingFiles = (files =[]) =>{
    return async (dispatch)=>{
        dispatch(setSaving());
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push (fileUpload(file));
        }
        const photosUrl = await Promise.all (fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrl));
    }
}

export const startDeletingNote = () =>{
    return async (dispatch,getState)=>{
        dispatch(setSaving());
        const fileUploadPromises = [];
        const { uid } = getState().authSlice;
        const { activeNote } = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(activeNote.id));
    }
}