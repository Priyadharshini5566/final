import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useState } from "react";

export default function ProjectCard({ project, onChanged }) {
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const liked = user && project.likes?.includes(user.uid);
  const favorited = user && project.favorites?.includes(user.uid);

  const toggle = async (type) => {
    if (!user) return;
    try {
      setBusy(true);
      await api.post(`/projects/${project._id}/${type}`);
      onChanged?.();
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="card project-card h-100 border-0 shadow-sm">
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="avatar">{(project.ownerName || "U")[0].toUpperCase()}</div>
          <div className="d-flex gap-1">
            {user && (
              <>
                <button className={`icon-btn ${liked ? "active" : ""}`} disabled={busy} onClick={() => toggle("like")} title="Like">
                  <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} />
                </button>
                <button className={`icon-btn ${favorited ? "active" : ""}`} disabled={busy} onClick={() => toggle("favorite")} title="Favorite">
                  <i className={`bi ${favorited ? "bi-bookmark-fill" : "bi-bookmark"}`} />
                </button>
              </>
            )}
          </div>
        </div>

        <h5 className="fw-bold mb-2">{project.title}</h5>
        <p className="text-muted small flex-grow-1 project-description">{project.description}</p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {(project.tags || []).slice(0, 4).map(tag => (
            <span className="badge rounded-pill tag-badge" key={tag}>{tag}</span>
          ))}
        </div>

        <div className="small text-muted mb-3">
          <i className="bi bi-person me-1" /> {project.ownerName || "Student"} · {new Date(project.createdAt).toLocaleDateString()}
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="small text-muted"><i className="bi bi-heart me-1" />{project.likes?.length || 0}</span>
          <Link className="btn btn-dark btn-sm" to={`/projects/${project._id}`}>View Project <i className="bi bi-arrow-right ms-1" /></Link>
        </div>
      </div>
    </article>
  );
}
