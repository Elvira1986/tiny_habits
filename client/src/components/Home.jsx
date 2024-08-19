import "./Home.css";
function Home() {
  return (
    <div className="Home">
      <h1 className="text-3xl">Welcome to Tiny Habits</h1>
      <p>
        Change your life for good with the Tiny Habits method—where simple
        changes lead to real, life-changing results. It is easier than you
        think, surprisingly fun, and Tiny Habbits are here to help. Effortlessly
        track your habits, reach your personal goals, and stay motivated every
        day. <br />
      </p>
      <ul>
        According to Dr. BJ Fogg, 3 key things need to come together for a
        behavior to happen:
        <li>
          <i className="fa-solid fa-check"></i>Motivation
        </li>
        <li>
          <i className="fa-solid fa-check"></i>Ability
        </li>
        <li>
          {" "}
          <i className="fa-solid fa-check"></i>Prompt
        </li>
      </ul>
      <h3>How About 21 Day Myth?</h3>
      <p>
        There is a popular idea out that it takes 21 days to make a habit.
        Assuming you engage the new behavior every day, a three-week commitment
        seems pretty manageable. Unfortunately, there are too many unknown
        variables, like how hard is the habit and what you have do to achieve.
        It is simply an incalculable equation, but we are here to help you to
        stay on habit journey motivated and keep it track.
      </p>
    </div>
  );
}
export default Home;
