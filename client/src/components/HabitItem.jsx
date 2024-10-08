import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HabitItem.css";

function HabitItem() {
  // Initilizing the state of habit
  const habitInitialState = {
    title: "",
    description: "",
    completed: 0,
    days_in: "",
    total_days: "",
  };

  // Creating the state for habit
  const [habit, setHabit] = useState(habitInitialState);
  // Creating the state for Edit & assigning to false
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Geting Habit with specific id and passing this data to front end
  const getHabitItem = async () => {
    try {
      const response = await fetch(`/api/habits/${id}`);
      const data = await response.json();
      setHabit(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getHabitItem();
  }, [id]);

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

  // EDIT habit where we edit the change and send data back to server
  async function editHabit() {
    let body = { ...habit, completed: 0 };
    // Do the PUT by creating fetch options
    let options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    try {
      let response = await fetch(`/api/habits/${id}`, options);
      if (response.ok) {
        let data = await response.json();
        getHabitItem();
        setHabit(data);
        navigate(`/habits`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  // Calling the form to send new edit data to the Database and calling PUT/editHabit function
  function handleUpdate(e) {
    e.preventDefault();
    editHabit();
  }
  // Switching to table with inputs when you click Edit button in HabitItem
  function editMode() {
    setIsEdit(!isEdit);
  }

  // Changing data in Input
  function handleInput(e) {
    // targeting object inputs with event target
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    // Setting new values with previous values to update it
    setHabit((habitBefore) => ({ ...habitBefore, [name]: value }));
  }

  return (
    <>
      <div>
        {isEdit ? (
          <>
            <h3>Update Current Habbit</h3>
            <form onSubmit={handleUpdate}>
              <table>
                <tr>
                  <td>
                    <label>Update Habit: </label>
                    <input
                      type="text"
                      name="title"
                      onChange={handleInput}
                      value={habit.title}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Update Motivation: </label>
                    <input
                      type="text"
                      name="description"
                      onChange={handleInput}
                      value={habit.description}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Edit Days IN: </label>
                    <input
                      type="number"
                      name="days_in"
                      onChange={handleInput}
                      value={habit.days_in}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Edit Target Days: </label>
                    <input
                      type="number"
                      name="total_days"
                      onChange={handleInput}
                      value={habit.total_days}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <button type="submit">Update</button>
                  </td>
                </tr>
              </table>
            </form>
          </>
        ) : (
          <>
            <h3>Your Current Habbit</h3>
            <table>
              <tr>
                <td>{habit.title} </td>
              </tr>
              <tr>
                <td> {habit.description}</td>
              </tr>
              <tr>
                <td>
                  {habit.days_in} <span> of </span>
                  {habit.total_days} <span> days</span>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={editMode}>
                    <i className="fa-solid fa-marker" title="Edit Habit"></i>
                  </button>
                  <button onClick={deleteHabit}>
                    <i
                      className="fa-solid fa-trash-can"
                      title="Delete Habit"
                    ></i>
                  </button>
                </td>
              </tr>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default HabitItem;
