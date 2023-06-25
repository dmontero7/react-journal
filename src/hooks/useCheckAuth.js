import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, startLoadingNotes } from "../app";
import { FirebaseAuth } from "../firebase/config";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.authSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
        });
    }, []);

  return {status}
}