import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/api.css";

const UniversityAPI = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://universities.hipolabs.com/search?country=United+States"
        );
        // Only display first 20 records
        const first20Universities = response.data.slice(0, 20);
        setUniversities(first20Universities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="containerr">
      <div className="header">
        <h2>Universities in the United States</h2>
        <Link className="Link" to={"/"}>
          to Form
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>University Name</th>
            <th>Country</th>
            <th>Alpha_Two_Code</th>
            <th># of Domains</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university, index) => (
            <tr key={index}>
              <td>{university.name}</td>
              <td>{university.country}</td>
              <td>{university.alpha_two_code}</td>
              <td>{university.domains.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityAPI;
