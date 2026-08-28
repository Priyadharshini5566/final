
import React from "react";
export default function Loading({ text = "Loading..." }) {
  return (
    <div className="page-center py-5">
      <div className="spinner-border text-primary mb-3" role="status" />
      <div className="text-muted">{text}</div>
    </div>
  );
}
