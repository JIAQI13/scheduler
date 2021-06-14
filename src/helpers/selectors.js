const getAppointmentsForDay = function (state, day) {
    const filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length !== 0) {
        return filteredDay[0]["appointments"].map(ele => state["appointments"][ele]);
    } else {
        return [];
    }
};


const getInterview = function (state, interview) {
    return !interview ? null : { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
};

const getInterviewersForDay = function (state, day) {
    const filteredInterviewer = state.days.filter(days => days.name === day);
    if (filteredInterviewer.length !== 0) {
        return filteredInterviewer[0]["interviewers"].map(ele => state["interviewers"][ele]);
    } else {
        return [];
    }
};

export {
    getAppointmentsForDay,
    getInterview,
    getInterviewersForDay
}