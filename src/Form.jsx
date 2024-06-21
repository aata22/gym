import React, { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import VideoBackground from "./VideoBackground.jsx";
import './VideoBackground.css'; // Ensure the correct path


export default function Form () {
    const [name, setName] = useState("");
    const [day, setDay] = useState("");
    const [taimi, setTime] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState([]);
   

    //handle gets
    useEffect(() => {
        fetch('http://localhost:4000/get-form-info')
        .then(response => response.json())
        .then((data) => {
          console.log('fetched data:', data)
          setData(data)
        }) 
        .catch((error) => {console.error('error fetching data:', error)})
    }, []);

    const handleDayChange = (event) => {
      setDay(event.target.value);
      setTime('')
    }

    const getEntriesForSelectedDay = () => {
      const dayData = data.find(dayItem => dayItem.day === day);
      if (!dayData) return [];
      
      // Sort the entries by time
      const sortedEntries = dayData.entries.slice().sort((a, b) => {
        return a.taimi.localeCompare(b.taimi);
      });
  
      return sortedEntries;
    };



    //handle submissions
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(`Submitting: ${name}, ${day}, ${taimi}`); // Add this line

            const response = await axios.post('http://localhost:4000/submit', {name, day, taimi})
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
              onChange={handleDayChange}
            >
            <option value="" disabled>Select a day</option>
            {data.map((dayItem, index) => (
              <option key={index}>{dayItem.day} </option>
            ))}
            
            </select>
            {day && (
              <>
              <label>Time:</label>
              <select
              id="dropdown"
              value={taimi}
              onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled>Select a time</option>
                {getEntriesForSelectedDay().map((entry, index) => (
                  <option 
                  key={index} 
                  value={entry.taimi}
                  disabled = {entry.name ? true : false}>
                    {entry.time}
                  </option>
                ))}

              </select>
              </>
            )}
            
            <input type="submit" value="Submit" />
          </form>
        </VideoBackground>
      );
}