import { useState, useEffect } from "react";
import axios from "axios";

import { getAppointmentsForDay, getAppointmentsById } from "../helpers/selectors";

const useApplicationData = function () {
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
                days: all[0]["data"],
                appointments: getAppointmentsForDay({
                    ...prev,
                    days: all[0]["data"],
                    appointments: all[1]["data"],
                    interviewers: all[2]["data"]
                },
                    state.day
                ),
                interviewers: all[2]["data"]
            }))
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

    return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;