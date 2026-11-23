import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Compass, ShieldCheck } from "lucide-react";
import { useAuth } from "./AuthContext";

const errorText = (error) => {
  if (error.message === "FIREBASE_NOT_CONFIGURED") {
    return "Authentication is not configured yet. Add your Firebase values to the .env file and restart the dev server.";
  }
  if (error.message === "EMAIL_NOT_VERIFIED") {
    return "Please verify your email first. A fresh verification link has been sent to your inbox.";
  }
  const messages = {
    "auth/email-already-in-use": "This email is already registered. Try logging in.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/weak-password": "Use a password with at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/popup-blocked": "Your browser blocked the Google sign-in popup.",
    "auth/too-many-requests": "Too many attempts. Please wait and try again.",
    "auth/network-request-failed": "Network error. Check your internet connection.",
    "auth/operation-not-allowed": "Enable this sign-in method in Firebase Console.",
    "auth/unauthorized-domain": "Add this website domain in Firebase Authorized domains.",
  };
  return messages[error.code] || "Something went wrong. Please try again.";
};

export default function AuthPage() {
  const { user, loading, configured, signup, login, googleLogin, forgotPassword } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (loading) return <main className="auth-screen"><p>Checking your account…</p></main>;
  if (user?.emailVerified) return <Navigate to="/account" replace />;

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    setMessage("");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (mode === "signup" && name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (mode !== "forgot" && password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }

    try {
      setBusy(true);
      if (mode === "signup") {
        await signup(name, email, password);
        setMode("login");
        setPassword("");
        setMessage("Account created. Check your inbox (and spam folder) to verify your email, then log in.");
      } else if (mode === "login") {
        await login(email, password);
      } else {
        await forgotPassword(email);
        setMessage("If an account exists for this email, a password reset link has been sent.");
      }
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setMessage("");
    try {
      setBusy(true);
      await googleLogin();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-panel">
        <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to website</Link>
        <div className="auth-brand"><span><Compass size={26} /></span><div><b>RAM</b><small>TRAVELING AGENCY</small></div></div>
        <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
        <h1>{mode === "signup" ? "Create your account." : mode === "forgot" ? "Reset your password." : "Welcome back."}</h1>
        <p className="auth-intro">
          {mode === "signup" ? "Save your travel plans and get ready for your next journey." : mode === "forgot" ? "We'll send a reset link if an account matches your email." : "Sign in to continue planning your next trip around India."}
        </p>

        {!configured && (
          <div className="auth-config-note">
            <ShieldCheck size={19} />
            <div><b>Firebase setup required</b><p>Create a local <code>.env</code> file using <code>.env.example</code>, then restart the server. Authentication is disabled until configured.</p></div>
          </div>
        )}

        <div className="auth-switch">
          <button type="button" className={mode === "login" ? "selected" : ""} onClick={() => changeMode("login")}>Log in</button>
          <button type="button" className={mode === "signup" ? "selected" : ""} onClick={() => changeMode("signup")}>Sign up</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && <label>Full name<input value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your name" required /></label>}
          <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
          {mode !== "forgot" && <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={8} placeholder="At least 8 characters" required /></label>}
          {mode === "login" && <button className="auth-inline-button" type="button" onClick={() => changeMode("forgot")}>Forgot password?</button>}
          <button className="auth-submit" type="submit" disabled={busy || !configured}>
            {busy ? "Please wait…" : mode === "signup" ? "Create account" : mode === "forgot" ? "Send reset link" : "Log in"}
          </button>
        </form>

        {error && <p className="auth-error" role="alert">{error}</p>}
        {message && <p className="auth-success" role="status">{message}</p>}

        {mode !== "forgot" && <><div className="auth-divider"><span>or continue with</span></div><button type="button" className="auth-google" onClick={handleGoogle} disabled={busy || !configured}><span className="google-g" aria-hidden="true">G</span> Continue with Google</button></>}
        {mode === "forgot" && <button className="auth-inline-button" type="button" onClick={() => changeMode("login")}>Back to login</button>}
        <p className="auth-terms">Your account is handled by Firebase Authentication. Never share your password with anyone.</p>
      </section>
    </main>
  );
}


export function AccountPage() {
  const { user, loading, logout, configured } = useAuth();
  if (loading) return <main className="auth-screen"><p>Checking your account…</p></main>;
  if (!user || !user.emailVerified) return <AuthPage />;

  return (
    <main className="auth-screen">
      <section className="auth-panel account-panel">
        <div className="auth-brand"><span><Compass size={26} /></span><div><b>RAM</b><small>TRAVELING AGENCY</small></div></div>
        <span className="eyebrow">TRAVELLER ACCOUNT</span>
        <h1>Welcome{user.displayName ? `, ${user.displayName}` : " back"}.</h1>
        <p className="auth-intro">You're signed in and ready to plan your next trip.</p>
        <div className="account-detail"><span>Email address</span><strong>{user.email}</strong><small>{user.emailVerified ? "Email verified" : "Email not verified"}</small></div>
        <div className="account-links">
          <Link className="auth-submit auth-link-button" to="/destinations">Explore destinations</Link>
          <Link className="auth-google auth-link-button" to="/packages">Browse tour packages</Link>
          <Link className="auth-google auth-link-button" to="/custom-trip">Plan a custom trip</Link>
        </div>
        <button className="auth-inline-button account-logout" onClick={async () => { try { await logout(); } catch { /* Firebase reports sign-out failures through its promise. */ } }}>Log out</button>
        {!configured && <p className="auth-error">Firebase is not configured.</p>}
      </section>
    </main>
  );
}
