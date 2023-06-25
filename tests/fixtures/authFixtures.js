export const initialState={
    status:'checking', // not-authenticated //authenticated
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null
}

export const authenticatedState={
    status:'authenticated',
    uid:'123ABC',
    email:'demo@mail.com',
    displayName:'Demo',
    photoURL:'https://demo.jpg',
    errorMessage:null
}

export const notAuthenticatedState={
    status:'not-authenticated',
    uid:null,
    email:null,
    displayName:null,
    photoURL:null,
    errorMessage:null
}

export const demoUser={
    uid:'123ABC',
    email:'demo@gmail.com',
    displayName:'Demo',
    photoURL:'https://demo.jpg'
}