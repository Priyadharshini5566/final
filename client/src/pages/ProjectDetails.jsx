import React from "react";
import { useEffect,useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Loading from "../components/Loading";

export default function ProjectDetails(){
 const{id}=useParams();const navigate=useNavigate();const{user}=useAuth();const[project,setProject]=useState(null);const[comments,setComments]=useState([]);const[text,setText]=useState("");const[loading,setLoading]=useState(true);const[error,setError]=useState("");
 const load=async()=>{try{const[r,c]=await Promise.all([api.get(`/projects/${id}`),api.get(`/projects/${id}/comments`)]);setProject(r.data.project);setComments(c.data.comments)}catch(e){setError(e.response?.data?.message||"Project not found.")}finally{setLoading(false)}};
 useEffect(()=>{load()},[id]);
 const addComment=async e=>{e.preventDefault();if(!text.trim())return;await api.post(`/projects/${id}/comments`,{content:text});setText("");load()};
 const remove=async()=>{if(confirm("Delete this project? This cannot be undone.")){await api.delete(`/projects/${id}`);navigate("/my-projects")}};
 if(loading)return <Loading text="Loading project..." />;if(error)return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
 const owner=user?.uid===project.ownerUid;
 return <div className="container py-5">
  <div className="mb-4"><Link to="/" className="text-decoration-none"><i className="bi bi-arrow-left me-1"/> Back to projects</Link></div>
  <div className="row g-5">
   <div className="col-lg-8">
    <span className="eyebrow">PROJECT</span><h1 className="display-5 fw-bold mt-2">{project.title}</h1>
    <div className="d-flex align-items-center gap-2 text-muted mb-4"><div className="avatar avatar-sm">{(project.ownerName||"U")[0].toUpperCase()}</div>{project.ownerName} · {new Date(project.createdAt).toLocaleDateString()}</div>
    <p className="lead project-detail-description">{project.description}</p>
    <div className="d-flex flex-wrap gap-2 mb-4">{project.tags.map(t=><span className="badge rounded-pill tag-badge" key={t}>{t}</span>)}</div>
    <div className="mb-4">
      <div className="small text-muted mb-2">Rate this project</div>
      <div className="d-flex gap-1">{[1,2,3,4,5].map(n=><button key={n} className="btn btn-sm btn-outline-warning" onClick={async()=>{if(user){await api.post(`/projects/${id}/rating`,{rating:n});load()}}}><i className="bi bi-star-fill"/></button>)}</div>
    </div>
    <div className="d-flex gap-2 flex-wrap">{project.githubUrl&&<a target="_blank" rel="noreferrer" className="btn btn-dark" href={project.githubUrl}><i className="bi bi-github me-2"/>GitHub</a>}{project.liveDemoUrl&&<a target="_blank" rel="noreferrer" className="btn btn-outline-dark" href={project.liveDemoUrl}><i className="bi bi-box-arrow-up-right me-2"/>Live Demo</a>}{owner&&<><Link className="btn btn-outline-primary" to={`/edit-project/${id}`}>Edit</Link><button className="btn btn-outline-danger" onClick={remove}>Delete</button></>}</div>
   </div>
   <div className="col-lg-4"><div className="stats-card"><div><strong>{project.likes?.length||0}</strong><span>Likes</span></div><div><strong>{comments.length}</strong><span>Comments</span></div><div><strong>{project.ratingCount?((project.ratingTotal/project.ratingCount)||0).toFixed(1):"—"}</strong><span>Rating</span></div></div></div>
  </div>
  <hr className="my-5"/>
  <section className="comments-section"><h3 className="fw-bold mb-4">Comments</h3>{user?<form onSubmit={addComment} className="d-flex gap-2 mb-4"><input className="form-control" value={text} onChange={e=>setText(e.target.value)} placeholder="Share your feedback..." maxLength={1000}/><button className="btn btn-dark">Post</button></form>:<div className="alert alert-light border">Please <Link to="/login">sign in</Link> to comment.</div>}{comments.length===0?<p className="text-muted">No comments yet. Start the conversation.</p>:comments.map(c=><div className="comment card border-0 bg-light mb-2 p-3" key={c._id}><div className="d-flex justify-content-between"><strong>{c.userName}</strong>{user?.uid===c.userUid&&<button className="btn btn-sm text-danger" onClick={async()=>{await api.delete(`/comments/${c._id}`);load()}}>Delete</button>}</div><p className="mb-0 mt-1">{c.content}</p></div>)}</section>
 </div>
}
