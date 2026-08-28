import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

export default function MyProjects() {
  const [projects,setProjects]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  const load=async()=>{try{setLoading(true);const r=await api.get("/projects/mine");setProjects(r.data.projects);}catch(e){setError("Could not load your projects.")}finally{setLoading(false)}};
  useEffect(()=>{load()},[]);
  return <div className="container py-5"><div className="d-flex justify-content-between align-items-end mb-4"><div><span className="eyebrow">YOUR WORK</span><h1 className="fw-bold mt-2">My Projects</h1></div><Link className="btn btn-primary" to="/create-project"><i className="bi bi-plus-lg me-1"/> New Project</Link></div>
    {loading?<Loading/>:error?<div className="alert alert-danger">{error}</div>:projects.length===0?<div className="empty-state"><i className="bi bi-folder-plus display-5"/><h4 className="mt-3">No projects yet</h4><p className="text-muted">Share your first project with the community.</p><Link to="/create-project" className="btn btn-primary">Create Project</Link></div>:<div className="row g-4">{projects.map(p=><div className="col-md-6 col-lg-4" key={p._id}><ProjectCard project={p} onChanged={load}/></div>)}</div>}
  </div>;
}
