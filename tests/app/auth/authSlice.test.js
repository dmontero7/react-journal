import { authSlice, checkingCredentials, login, logout } from "../../../src/app/auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('should regresar el estado inicial y llamarse authSlice', () => {
        const state = authSlice.reducer(initialState, {});
        expect(authSlice.name).toBe('auth');
        expect(state).toEqual(initialState);
    })
    test('should realizar la authenticacion', () => {
        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    })

    test('should realizar el logout', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status:'not-authenticated',
            uid:null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage:undefined
        });
    })

    test('should realizar el logout con argumentos', () => {
        const errorMessage = 'Ocurrio un error al loguear';
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        expect(state).toEqual({
            status:'not-authenticated',
            uid:null,
            email:null,
            displayName:null,
            photoURL:null,
            errorMessage:errorMessage
        });
    })

    test('should cambiar el estado a checking', () => { 
        const state = authSlice.reducer(authenticatedState,checkingCredentials());
        expect(state.status).toBe('checking');
     })
})