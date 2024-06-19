import { useEffect, useState } from "react";
import React from "react";
import styles from "./Schedule.module.css";


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
        <div className={styles.tableContainer}>
           
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
                    {name.taimi.map((taimi,  index) => (
                        <tr key={index}>
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
