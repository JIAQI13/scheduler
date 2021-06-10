import React from "react";
// import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import "components/Appointment/Confirm";
import "components/Appointment/Status";
import "components/Appointment/Error";

export default function Appointment(props) {
    return (
        <>
            <Header time={props.time} />
            {props.interview
                ? <Show student="Lydia Miller-Jones"
                    interviewers={props.interview.interviewers}
                />
                : <Empty />
            }
        </>
    );
}