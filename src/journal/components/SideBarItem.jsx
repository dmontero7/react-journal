import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../app";

export const SideBarItem = ({ title='', body, id,date,imageUrls=[] }) => {
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);


    const onSelectNote=(event) =>{
        const selectedNote = {id,body,title,date,imageUrls};
        dispatch(setActiveNote(selectedNote));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onSelectNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}