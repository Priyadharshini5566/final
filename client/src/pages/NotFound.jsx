import { Link } from "react-router-dom";
export default function NotFound(){return <div className="page-center text-center py-5"><div className="display-1 fw-bold">404</div><h2>Page not found</h2><p className="text-muted">The page you're looking for doesn't exist.</p><Link className="btn btn-dark" to="/">Back home</Link></div>}
