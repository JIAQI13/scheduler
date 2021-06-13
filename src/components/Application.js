import React, { useState, useEffect } from "react";
import "components/Application.scss";
import Appointment from "components/Appointment/Index";
import DayList from "./DayList";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay, getAppointmentsById } from "helpers/selectors";


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

  function spotCalculator(id, boolean = false) {     //update spots. boolean ? new appointment : delete appointment 

    let spot = 0;
    boolean ? spot-- : spot++;
    const days = state.days.filter(ele => {
      return [ele.appointments.find(appId => appId === id) ? ele.spots += spot : null, ele];
    });
    return setState({ ...state, days });
  };

  function bookInterview(id, interview, edit) {
    const appointments = getAppointmentsById(state.appointments, interview, id);
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(res => console.log(res))
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(() => {
        if (!edit) { spotCalculator(id, true) }                  // edit ? editing, no spot change : new booking, spot--
      });                                                      // putting here to prevent falsy change in case of server down
  };

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => console.log(res))
      .then(() => {
        setState({
          ...state,
        })
      })
      .then(() => {
        spotCalculator(id);
      })
  };

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
          state["appointments"].map(ele => {
            const interviewName = getInterview(state, ele.interview)    //student name & interviewer, if exists.
            return <Appointment
              key={ele.id}
              id={ele.id}
              time={ele.time}
              interview={interviewName}
              interviewers={getInterviewersForDay(state, state.day)}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          })
        }
      </section>
    </main>
  );
}
