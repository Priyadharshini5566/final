import React from "react";
export default function Footer() {
  return (
    <footer className="border-top bg-white mt-5">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
        <span className="text-muted small">© {new Date().getFullYear()} Peer Project Hub</span>
        <span className="text-muted small">Share • Discover • Learn</span>
      </div>
    </footer>
  );
}
