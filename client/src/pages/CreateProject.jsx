
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProjectForm from "../components/ProjectForm";

export default function CreateProject() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async data => {
    try { setBusy(true); setError(""); const res = await api.post("/projects", data); navigate(`/projects/${res.data.project._id}`); }
    catch (e) { setError(e.response?.data?.message || "Could not create project."); }
    finally { setBusy(false); }
  };

  return <div className="container py-5 narrow"><div className="mb-4"><span className="eyebrow">SHARE YOUR WORK</span><h1 className="fw-bold mt-2">Create a project</h1><p className="text-muted">Tell the community what you built.</p></div>{error && <div className="alert alert-danger">{error}</div>}<ProjectForm onSubmit={submit} submitting={busy} submitText="Publish Project"/></div>;
}
