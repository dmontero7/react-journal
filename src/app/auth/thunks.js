import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
    return async(dispatch)=> {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(result.ok){
            dispatch(login(result));
        }else{
            dispatch(logout(result.errorMessage));
        }
    }
}

export const startCreatingUserWithEmailAndPassword = ({email,password,name}) =>{
    return async (dispatch) =>{
        dispatch(checkingCredentials());
        const {ok,uid,photoURL,errorMessage} = await registerUserWithEmailAndPassword({email,password,name});
        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid,email,displayName:name,photoURL}));

    }
}

export const startLoginWithEmailAndPassword = ({email,password}) =>{
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPassword({email,password}); 

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }   
}

export const startLogout = () => {
    return async (dispatch) =>{
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}