
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth, firebaseConfigured } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      () => {
        setUser(null);
        setLoading(false);
      }
    );
  }, []);

  const signup = useCallback(async (name, email, password) => {
    if (!auth) {
      throw new Error("FIREBASE_NOT_CONFIGURED");
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    try {
      await updateProfile(credential.user, {
        displayName: name.trim(),
      });

      await sendEmailVerification(credential.user);
    } finally {
      // Email verification is required before normal email/password login.
      await signOut(auth);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    if (!auth) {
      throw new Error("FIREBASE_NOT_CONFIGURED");
    }

    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    if (!credential.user.emailVerified) {
      try {
        await sendEmailVerification(credential.user);
      } finally {
        await signOut(auth);
      }

      throw new Error("EMAIL_NOT_VERIFIED");
    }

    return credential.user;
  }, []);

  const googleLogin = useCallback(async () => {
    if (!auth) {
      throw new Error("FIREBASE_NOT_CONFIGURED");
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    return signInWithPopup(auth, provider);
  }, []);

  const forgotPassword = useCallback(async (email) => {
    if (!auth) {
      throw new Error("FIREBASE_NOT_CONFIGURED");
    }

    return sendPasswordResetEmail(auth, email.trim());
  }, []);

  const logout = useCallback(async () => {
    if (!auth) {
      return;
    }

    return signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      configured: firebaseConfigured,
      signup,
      login,
      googleLogin,
      forgotPassword,
      logout,
    }),
    [
      user,
      loading,
      signup,
      login,
      googleLogin,
      forgotPassword,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return value;
}
