
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    try {
      setBusy(true); setError("");
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.code === "auth/email-already-in-use" ? "An account already exists for this email." : err.message || "Registration failed.");
    } finally { setBusy(false); }
  };

  return <div className="auth-page"><div className="auth-card card border-0 shadow-sm p-4 p-md-5">
    <div className="text-center mb-4"><div className="brand-mark mx-auto mb-3"><i className="bi bi-code-slash"/></div><h2 className="fw-bold">Create your account</h2><p className="text-muted">Join the student developer community.</p></div>
    <form onSubmit={submit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <label className="form-label fw-semibold">Full name</label><input className="form-control mb-3" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <label className="form-label fw-semibold">Email</label><input className="form-control mb-3" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <label className="form-label fw-semibold">Password</label><input className="form-control mb-3" type="password" minLength={6} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <label className="form-label fw-semibold">Confirm password</label><input className="form-control mb-4" type="password" minLength={6} required value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/>
      <button className="btn btn-primary btn-lg w-100" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
      <p className="text-center text-muted mt-4 mb-0">Already registered? <Link to="/login">Sign in</Link></p>
    </form>
  </div></div>;
}
