import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitItem from "./components/HabitItem";
import Page404 from "./components/Page404";
import Footer from "./components/Footer";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-habit" element={<HabitForm />} />
        <Route path="/habits" element={<HabitList />} />
        <Route path="/habits/:id" element={<HabitItem />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
