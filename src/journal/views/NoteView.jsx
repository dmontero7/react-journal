import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGalery } from "../components"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../app";
import Swal from "sweetalert2";

export const NoteView = () => {
    const { activeNote, messageSaved, isSaving } = useSelector(state => state.journal);
    const { id, body, title, date, onInputChange, formState } = useForm(activeNote);
    const dispatch = useDispatch();
    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    })

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }
    return (
        <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={20} fontWeight='light'>{dateString}</Typography>
            </Grid>
            <Grid item>
                <input ref={fileInputRef} type="file" multiple onChange={onFileInputChange} style={{ display: 'none' }}></input>
                <IconButton color="primary" disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>
                <Button onClick={onSaveNote} disabled={isSaving} color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange} />
                <TextField type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange} />
            </Grid>
            <Grid container justifyContent='end'>
                <Button
                    disabled={isSaving}
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error">
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            <ImageGalery images={activeNote.imageUrls} />
        </Grid>
    )
}