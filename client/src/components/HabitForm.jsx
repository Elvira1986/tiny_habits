import { useState } from "react";
import "./HabitForm.css";
import { useNavigate } from "react-router-dom";

const EmptyForm = {
  title: "",
  description: "",
  days_in: "",
  total_days: "",
};

function HabitForm() {
  const navigate = useNavigate();
  const [newHabit, setNewHabit] = useState(EmptyForm);

  function handleChange(event) {
    let { name, value } = event.target;
    setNewHabit((newHabit) => ({
      ...newHabit,
      [name]: value,
    }));
  }

  async function addHabit() {
    let body = { ...newHabit, completed: 0 };

    // Create fetch options
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      let response = await fetch("/api/habits", options);
      if (response.ok) {
        await response.json();
        setNewHabit(EmptyForm);
        navigate(`/habits`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    addHabit();
  }

  return (
    <>
      <h3>Create New Habit</h3>
      <form className="HabitForm" onSubmit={handleSubmit}>
        <label>
          New Habit
          <input
            type="text"
            name="title"
            placeholder="Go to gym"
            value={newHabit.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Habit Result and Motivation
          <input
            type="text"
            name="description"
            placeholder="Get fit and loose 10lb"
            value={newHabit.description}
            onChange={handleChange}
          />
        </label>
        <div className="span-2">
          <label>
            Days IN
            <input
              className="row"
              type="number"
              name="days_in"
              placeholder="1"
              value={newHabit.days_in}
              onChange={handleChange}
            />
          </label>
          <label>
            Target Days
            <input
              className="row"
              type="number"
              name="total_days"
              placeholder="90"
              value={newHabit.total_days}
              onChange={handleChange}
            />
          </label>
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default HabitForm;
