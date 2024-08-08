import { useEffect, useState } from "react";
import Home from "./components/Home";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitItem from "./components/HabitItem";
import Page404 from "./components/Page404";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="navbar">
        <Link to="/" className="home">
          Home
        </Link>
        <Link to="/new-habit">Add New Habit</Link>
        <Link to="/habits">Habits List</Link>
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
