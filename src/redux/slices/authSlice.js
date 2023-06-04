import { createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signOutStart(state) {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
} = authSlice.actions;

export const signIn = (email, password) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const { uid, email: userEmail } = user;
    const serializedUser = { uid, email: userEmail };
    dispatch(signInSuccess(serializedUser));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const signUp = (email, password) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, email: userEmail } = user;
    const serializedUser = { uid, email: userEmail };
    dispatch(signInSuccess(serializedUser));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch(signOutStart());
    await firebaseSignOut(auth);
    dispatch(signOutSuccess());
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    dispatch(signInStart());
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    const { uid, email } = user;
    const serializedUser = { uid, email };
    dispatch(signInSuccess(serializedUser));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { uid, email: userEmail } = user;
    const serializedUser = { uid, email: userEmail };
    dispatch(signInSuccess(serializedUser));
  } catch (error) {
    dispatch(signInFailure(error.message));
  }
};

export default authSlice.reducer;
