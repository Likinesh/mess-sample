import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessMenu = () => {
  const [mealData, setMealData] = useState([]);
  const mealDay = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/data/getmenu');
        console.log(res);
        setMealData(res);
      } catch (err) {
        console.log('Error while fetching menu', err);
      }
    };
    fetchMess();
  }, []);

  if (!mealData.length) {
    console.log(mealData);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1 >Mess Menu</h1>
      </div>
      <div >
        <table>
          <thead>
            <tr>
              <th>Day</th>
              {mealDay.map((meal, index) => (
                <th key={index}>{meal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealData.map((dayMeals, dayIndex) => (
              <tr key={dayIndex}>
                <td>{dayMeals.day}</td>
                <td>{dayMeals.breakfast}</td>
                <td>{dayMeals.lunch}</td>
                <td>{dayMeals.snacks}</td>
                <td>{dayMeals.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessMenu;