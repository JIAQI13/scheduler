import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
    const interviewersClass = classNames("interviewers__item", {
        "interviewers__item--selected": props.selected,
    });

    const interviewersImageClass = classNames(
        "interviewers__item-image", {
        "interviewers__item--selected-image": props.selected
    });

    return (
        <li className={interviewersClass} onClick={props.setInterviewer}>
            <img
                className={interviewersImageClass}
                src={props.avatar}
                alt={props.name}
            />
            {props.selected && props.name}
        </li>
    );
}