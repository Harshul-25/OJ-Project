import React from "react";
import { API_URL } from "./Api";
import Nav from "./Nav";
import Subcard from "./Subcard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Submissions() {
  const [data, setData] = useState([]);
  const mail = sessionStorage.getItem("mail");
  const handle = sessionStorage.getItem('handle');
  useEffect(() => {
    const getdata = async () => {
      try {
        await axios
          .post(`${API_URL}/getsubmissions`, { mail })
          .then((res) => setData(res.data));
      } catch (error) {
        console.log(error, "something went wrong");
      }
    };
    getdata();
  },[mail]);

  const subs = data.map((i, index) => {
    return (
      <Subcard
        key={index}
        id={i.problemid}
        name={i.probname}
        code={i.code}
        verdict={i.verdict}
        lang={i.language}
        time={i.submittedAt}
      />
    );
  });

  return (
    <div className="problem-page">
      <h2> {handle} submissions </h2>
      <Nav />
      <div className="problems-wrapper">
        <div className="submission-header">
            <div className="sub-element">Time</div>
            <div className="sub-element">Problem</div>
            <div className="sub-element">Language</div>
            <div className="sub-element">Verdict</div>
        </div>
        {subs}
      </div>
    </div>
  );
}
