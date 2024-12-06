import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      person: {
        fullName: "John Doe",
        bio: "Anonymous Guy and a Software Engineer and JavaScript Enthusiast.",
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrJjZSFDRpSGa30u5aYm7-5u5abkJ8a7yoQ&s",
        profession: "Developer & Hacker",
      },
      show: false,
      timeElapsed: 0, // Time elapsed while mounted
    };

    this.interval = null; // Initialize interval
  }

  // Lifecycle method to clean up the timer when the component unmounts
  componentWillUnmount() {
    this.stopTimer();
  }

  // Start the timer
  startTimer = () => {
    if (!this.interval) {
      // Only start the timer if it isn't already running
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          timeElapsed: prevState.timeElapsed + 1,
        }));
      }, 1000);
    }
  };

  // Stop the timer
  stopTimer = () => {
    clearInterval(this.interval);
    this.interval = null; // Reset the interval to null
  };

  // Toggle show state
  toggleShow = () => {
    this.setState((prevState) => {
      const newShowState = !prevState.show;

      if (newShowState) {
        // If showing, reset timeElapsed to 0 and start the timer
        this.setState({ timeElapsed: 0 }); // Reset timeElapsed
        this.startTimer(); // Start timer
      } else {
        // If hiding, stop the timer
        this.stopTimer(); // Stop timer
      }

      return { show: newShowState }; // Update the show state
    });
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.person;
    const { show, timeElapsed } = this.state;

    return (
      <div className="App">
        <h1 className="boldText">User Profile</h1>
        <button className="button" onClick={this.toggleShow}>
          {show ? "Hide Profile" : "Show Profile"}
        </button>

        {show && (
          <div className="profile">
            <h2>{fullName}</h2>
            <img src={imgSrc} alt={fullName} style={{ borderRadius: "10px" }} />
            <p>{bio}</p>
            <p>Profession: {profession}</p>
          </div>
        )}

        {/* Display time if the profile is hidden or shown */}
        <p>
          Time since mounted:{" "}
          {show ? timeElapsed : `Stopped at ${timeElapsed} seconds`}
        </p>
      </div>
    );
  }
}

export default App;
