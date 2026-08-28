

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import MyProjects from "./pages/MyProjects";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
      <BrowserRouter>
            <AuthProvider>
                    <div className="app-shell">
                              <Navbar />
                                        <main className="flex-grow-1">
                                                    <Routes>
                                                                  <Route path="/" element={<Home />} />
                                                                                <Route path="/login" element={<Login />} />
                                                                                              <Route path="/register" element={<Register />} />
                                                                                                            <Route path="/projects/:id" element={<ProjectDetails />} />
                                                                                                                          <Route element={<ProtectedRoute />}>
                                                                                                                                          <Route path="/create-project" element={<CreateProject />} />
                                                                                                                                                          <Route path="/edit-project/:id" element={<EditProject />} />
                                                                                                                                                                          <Route path="/my-projects" element={<MyProjects />} />
                                                                                                                                                                                          <Route path="/favorites" element={<Favorites />} />
                                                                                                                                                                                                          <Route path="/profile" element={<Profile />} />
                                                                                                                                                                                                                        </Route>
                                                                                                                                                                                                                                      <Route path="*" element={<NotFound />} />
                                                                                                                                                                                                                                                  </Routes>
                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                      <Footer />
                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                    </AuthProvider>
                                                                                                                                                                                                                                                                                        </BrowserRouter>
                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                          