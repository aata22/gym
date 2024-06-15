import { useState } from "react"
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import VideoBackground from "./VideoBackground.jsx";
import './VideoBackground.css'; // Ensure the correct path


export default function Form () {
    const [name, setName] = useState("");
    const [day, setDay] = useState("");
    const [taimi, setTime] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(`Submitting: ${name}, ${day}, ${taimi}`); // Add this line

            const response = await axios.post('http://localhost:3001/submit', {name, day, taimi})
            console.log(response.data.message);
            navigate('/Schedule');
        } catch (error) {
            console.error(error);
        };
    }


    return (
        <VideoBackground>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Day:</label>
            <select
              id="dropdown"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="" disabled>Select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
            <label>Time:</label>
            <select
              id="dropdown"
              value={taimi}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="" disabled>Select a time</option>
              <option value="06:00:00">6am</option>
              <option value="07:00:00">7am</option>
              <option value="08:00:00">8am</option>
              <option value="09:00:00">9am</option>
              <option value="10:00:00">10am</option>
              <option value="11:00:00">11am</option>
              <option value="12:00:00">12pm</option>
              <option value="13:00:00">1pm</option>
              <option value="14:00:00">2pm</option>
              <option value="15:00:00">3pm</option>
              <option value="16:00:00">4pm</option>
              <option value="17:00:00">5pm</option>
              <option value="18:00:00">6pm</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </VideoBackground>
      );
}