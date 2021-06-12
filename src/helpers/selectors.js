export default function getAppointmentsForDay(state, day) {
    let result = [];
    const filteredDay = state.days.filter(days => days.name === day);
    if (filteredDay.length === 0) { return [] };
    for (const i of filteredDay[0].appointments) {
        result.push(state["appointments"][i]);
    }
    return result;
}
