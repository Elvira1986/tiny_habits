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
    // console.log(body);
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
      <h1>Habit Form</h1>
      <form className="HabitForm" onSubmit={handleSubmit}>
        <label>
          New Habit
          <input
            type="text"
            name="title"
            value={newHabit.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Habit Description
          <input
            type="text"
            name="description"
            value={newHabit.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Days IN
          <input
            type="number"
            name="days_in"
            value={newHabit.days_in}
            onChange={handleChange}
          />
        </label>
        <label>
          Total Days Target
          <input
            type="number"
            name="total_days"
            value={newHabit.total_days}
            onChange={handleChange}
          />
        </label>

        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default HabitForm;