import { useEffect, useState } from "react";
import React from "react";
import './Schedule.css';

export default function Schedule(){

    const [name, setName] = useState({ days: [], taimi: [], scheduleObj: {} });

    useEffect(() => {
        fetch('http://localhost:3001/get')
        .then((response) => response.json())
        .then(data => {
            setName(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
        })
    }, []);


    return(
        <div>
           
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {name.days.map(day => (
                            <th key={day}>{day}</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {name.taimi.map(taimi => (
                        <tr key={taimi}>
                            <td>{taimi}</td>
                            {name.days.map(day => (
                                <td>
                                    {name.scheduleObj[day][taimi].name ? `${name.scheduleObj[day][taimi].name}` : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
