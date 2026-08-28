
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    try {
      setBusy(true); setError("");
      await login(form.email, form.password);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.code === "auth/invalid-credential" ? "Invalid email or password." : "Login failed. Please check your details.");
    } finally { setBusy(false); }
  };

  return <AuthLayout title="Welcome back" subtitle="Sign in to continue to Peer Project Hub">
    <form onSubmit={submit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <label className="form-label fw-semibold">Email</label>
      <input className="form-control mb-3" type="email" required value={form.email} onChange={e => setForm({...form,email:e.target.value})} />
      <label className="form-label fw-semibold">Password</label>
      <input className="form-control mb-4" type="password" required minLength={6} value={form.password} onChange={e => setForm({...form,password:e.target.value})} />
      <button className="btn btn-dark btn-lg w-100" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      <p className="text-center text-muted mt-4 mb-0">Don't have an account? <Link to="/register">Create one</Link></p>
    </form>
  </AuthLayout>;
}

function AuthLayout({ title, subtitle, children }) {
  return <div className="auth-page"><div className="auth-card card border-0 shadow-sm p-4 p-md-5">
    <div className="text-center mb-4"><div className="brand-mark mx-auto mb-3"><i className="bi bi-code-slash"/></div><h2 className="fw-bold">{title}</h2><p className="text-muted">{subtitle}</p></div>{children}
  </div></div>;
}
