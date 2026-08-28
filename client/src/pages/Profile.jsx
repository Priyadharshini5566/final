import React from "react";
import { useEffect,useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

export default function Profile(){
 const{user}=useAuth();const[data,setData]=useState(null);const[loading,setLoading]=useState(true);
 useEffect(()=>{api.get(`/users/${user.uid}`).then(r=>setData(r.data)).finally(()=>setLoading(false))},[user.uid]);
 if(loading)return <Loading/>;
 return <div className="container py-5"><div className="profile-header card border-0 shadow-sm p-4 mb-4"><div className="avatar avatar-lg">{(user.displayName||"U")[0].toUpperCase()}</div><div><h2 className="fw-bold mb-1">{data?.user?.name||user.displayName||"Student Developer"}</h2><p className="text-muted mb-0">{user.email}</p></div></div><h4 className="fw-bold mb-3">Published Projects</h4><div className="row g-4">{(data?.projects||[]).map(p=><div className="col-md-6 col-lg-4" key={p._id}><ProjectCard project={p}/></div>)}</div></div>
}
