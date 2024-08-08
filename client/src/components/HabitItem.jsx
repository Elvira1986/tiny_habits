import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HabitItem.css";

function HabitItem() {
  const [habit, setHabit] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getHabitItem = async () => {
    try {
      const response = await fetch(`/api/habits/${id}`);
      const data = await response.json();
      setHabit(data);
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT habit
  async function editHabit() {
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
    } catch (err) {
      console.log(err);
    }
  }

  // DELETE the Habit
  async function deleteHabit() {
    // Do the DELETE by creating fetch options
    let options = {
      method: "DELETE",
    };

    try {
      let response = await fetch(`/api/habits/${id}`, options);
      if (response.ok) {
        let data = await response.json();
        navigate(`/habits`);
        setHabit(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  useEffect(() => {
    getHabitItem();
  }, [id]);

  return (
    <div>
      <h2>Habit Item</h2>
      <>
        {habit && (
          <div>
            <h3> {habit.title} </h3>
            <p> {habit.description}</p>
            <p>
              {habit.days_in} of {habit.total_days}{" "}
            </p>
            <div className="span-2">
              <button onClick={editHabit}>EDIT</button>
              <button onClick={deleteHabit}>DELETE</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default HabitItem;
