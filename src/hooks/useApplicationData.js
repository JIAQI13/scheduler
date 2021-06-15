import { useState, useEffect } from "react";
import axios from "axios";

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
                days: all[0].data,
                appointments: all[1].data,
                interviewers: all[2].data
            }))
        });
    }, [state.day]);

    const setDay = day => setState({ ...state, day });

    function updateSpots(id, plusOrMinus) {
        const days = {
            ...state.days
        };
        for (const i in days) {
            if (days[i].appointments.indexOf(id) >= 0) {
                plusOrMinus ?
                    days[i].spots = days[i].spots - 1 :
                    days[i].spots = days[i].spots + 1;
            }
        }
    }

    function bookInterview(id, interview) {

        //update locally
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        //add input to backend
        return axios.put(`/api/appointments/${id}`, { interview: interview }, { timeout: 10000 })
            .then(() => {
                updateSpots(id, true);
                setState(prev => ({
                    ...prev,
                    appointments
                }))
            })
    };

    function cancelInterview(id) {

        //delete data backend
        return axios.delete(`/api/appointments/${id}`, { timeout: 10000 })
            .then(() => {
                console.log(updateSpots(id, false));
                setState(prev => ({
                    ...prev
                }))
            })
        // .then(() => {
        //     updateSpots(id, false);
        // });
    };
    return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;