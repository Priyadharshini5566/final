import React from "react";
import { useState } from "react";

const empty = { title: "", description: "", tags: "", githubUrl: "", liveDemoUrl: "" };

export default function ProjectForm({ initial = empty, onSubmit, submitting = false, submitText = "Save Project" }) {
  const [form, setForm] = useState({
    ...empty,
    ...initial,
    tags: Array.isArray(initial.tags) ? initial.tags.join(", ") : initial.tags || "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={submit} className="card border-0 shadow-sm p-4">
      <div className="mb-3">
        <label className="form-label fw-semibold">Project title *</label>
        <input className="form-control form-control-lg" name="title" value={form.title} onChange={update} required maxLength={100} placeholder="e.g. College Management System" />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Description *</label>
        <textarea className="form-control" name="description" value={form.description} onChange={update} required rows="6" maxLength={3000} placeholder="Explain what your project does..." />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Tags *</label>
        <input className="form-control" name="tags" value={form.tags} onChange={update} required placeholder="React, Node.js, MongoDB" />
        <div className="form-text">Separate tags with commas.</div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">GitHub repository *</label>
          <input type="url" className="form-control" name="githubUrl" value={form.githubUrl} onChange={update} required placeholder="https://github.com/..." />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Live demo</label>
          <input type="url" className="form-control" name="liveDemoUrl" value={form.liveDemoUrl} onChange={update} placeholder="https://..." />
        </div>
      </div>
      <button className="btn btn-primary btn-lg w-100" disabled={submitting}>
        {submitting ? "Saving..." : submitText}
      </button>
    </form>
  );
}
