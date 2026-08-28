import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectCard from "../components/ProjectCard";
import Loading from "../components/Loading";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/projects", { params: { search, tag, page, limit: 9 } });
      setProjects(data.projects);
      setPages(data.pages);
      setTags(data.tags);
      setError("");
    } catch {
      setError("Unable to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [search, tag, page]);

  return (
    <>
      <section className="hero-section">
        <div className="container py-5">
          <div className="row align-items-center g-5 py-lg-4">
            <div className="col-lg-7">
              <span className="eyebrow">STUDENT DEVELOPER COMMUNITY</span>
              <h1 className="display-4 fw-bold mt-3">Build. Share. <span className="gradient-text">Inspire.</span></h1>
              <p className="lead text-secondary mt-3 mb-4">Discover coding projects created by students, learn from peers, and showcase what you've built.</p>
              <div className="d-flex gap-2 flex-wrap">
                <a href="#explore" className="btn btn-dark btn-lg">Explore Projects <i className="bi bi-arrow-down ms-1" /></a>
                <a href="/create-project" className="btn btn-outline-dark btn-lg">Share Your Project</a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-card shadow-lg">
                <div className="code-window">
                  <div className="window-dots"><span/><span/><span/></div>
                  <pre>{`const idea = "your project";\n\nshare(idea);\nlearnFromPeers();\nbuildSomethingBetter();`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="container py-5">
        <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2 className="fw-bold mt-2 mb-1">Latest projects</h2>
            <p className="text-muted mb-0">Fresh ideas from the student developer community.</p>
          </div>
        </div>

        <div className="card border-0 shadow-sm p-3 mb-4">
          <div className="row g-2">
            <div className="col-lg-8">
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-search"/></span>
                <input className="form-control" value={search} onChange={e => { setPage(1); setSearch(e.target.value); }} placeholder="Search title or description..." />
              </div>
            </div>
            <div className="col-lg-4">
              <select className="form-select" value={tag} onChange={e => { setPage(1); setTag(e.target.value); }}>
                <option value="">All technologies</option>
                {tags.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {loading ? <Loading text="Loading projects..." /> : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-folder2-open display-5" />
            <h4 className="mt-3">No projects found</h4>
            <p className="text-muted">Try another search or be the first to share a project.</p>
          </div>
        ) : (
          <>
            <div className="row g-4">
              {projects.map(p => <div className="col-md-6 col-lg-4" key={p._id}><ProjectCard project={p} onChanged={load} /></div>)}
            </div>
            {pages > 1 && (
              <nav className="d-flex justify-content-center mt-5">
                <ul className="pagination">
                  {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                    <li className={`page-item ${n === page ? "active" : ""}`} key={n}>
                      <button className="page-link" onClick={() => setPage(n)}>{n}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
}
