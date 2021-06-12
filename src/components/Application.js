import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment/Index";
import getAppointmentsForDay from "helpers/selectors";
import DayList from "./DayList";
import axios from "axios";
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }

];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: getAppointmentsForDay({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        },
          state.day
        ),
        interviewers: all[2].data
      }))
      console.log(state.interviewers);
    });
  }, [state.day]);

  const setDay = day => setState({ ...state, day });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          appointments.map((appointment) => {
            return (
              <>
                <Appointment key={appointment.id} {...appointment} />
                <Appointment time="5pm" />
              </>
            )
          })
        }
      </section>
    </main>
  );
}
