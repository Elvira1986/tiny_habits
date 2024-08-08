import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
// import HabitItem from "./HabitItem";
import "./HabitList.css";

function HabitList() {
  const [habits, setHabits] = useState([]);
  // get a list of habits and display them

  const getHabits = async () => {
    try {
      const response = await fetch("/api/habits");
      const data = await response.json();
      // console.log(data);
      setHabits(data);
    } catch (err) {
      console.log(err);
    }
  };

  // PATCH: Add a day to habit
  async function addDayToHabit(id) {
    let options = {
      method: "PATCH",
    };
    try {
      let response = await fetch(`/api/habits/${id}`, options);
      if (response.ok) {
        getHabits();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getHabits();
  }, []);

  return (
    <div>
      <h3>All Habit List </h3>
      <div className="habit-list">
        {habits.map((habit) => (
          <div className="habit-item" key={habit.id}>
            <button
              type="button"
              className="addDay"
              onClick={() => addDayToHabit(habit.id)}
            >
              Add Day
            </button>
            <Link to={`/habits/${habit.id}`}>
              <button type="button">Edit</button>
              {habit.title} {habit.days_in} / {habit.total_days}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default HabitList;