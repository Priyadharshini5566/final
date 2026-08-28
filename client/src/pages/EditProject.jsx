import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import ProjectForm from "../components/ProjectForm";
import Loading from "../components/Loading";

export default function EditProject() {
  const { id } = useParams(); const navigate = useNavigate();
  const [project, setProject] = useState(null); const [busy, setBusy] = useState(false); const [error, setError] = useState("");

  useEffect(() => { api.get(`/projects/${id}`).then(r=>setProject(r.data.project)).catch(e=>setError(e.response?.data?.message||"Project not found.")); }, [id]);

  const submit = async data => {
    try { setBusy(true); const r=await api.put(`/projects/${id}`,data); navigate(`/projects/${r.data.project._id}`); }
    catch(e){setError(e.response?.data?.message||"Could not update project.");} finally{setBusy(false);}
  };
  if (!project && !error) return <Loading text="Loading project..." />;
  return <div className="container py-5 narrow"><h1 className="fw-bold mb-4">Edit project</h1>{error&&<div className="alert alert-danger">{error}</div>}{project&&<ProjectForm initial={project} onSubmit={submit} submitting={busy} submitText="Update Project"/>}</div>;
}
