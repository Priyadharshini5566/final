import React from "react";
import { useEffect,useState } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

export default function Favorites(){
 const [projects,setProjects]=useState([]);const[loading,setLoading]=useState(true);
 const load=async()=>{try{setLoading(true);const r=await api.get("/projects/favorites");setProjects(r.data.projects)}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 return <div className="container py-5"><span className="eyebrow">SAVED</span><h1 className="fw-bold mt-2 mb-4">Favorite Projects</h1>{loading?<Loading/>:projects.length===0?<div className="empty-state"><i className="bi bi-bookmark display-5"/><h4 className="mt-3">No favorites yet</h4><p className="text-muted">Bookmark projects you want to revisit.</p></div>:<div className="row g-4">{projects.map(p=><div className="col-md-6 col-lg-4" key={p._id}><ProjectCard project={p} onChanged={load}/></div>)}</div>}</div>
}
