import React from "react";
// import classnames from "classnames";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        props
            .bookInterview(props.id, interview)
            .then(() => transition(SHOW))
            .catch(() => transition(ERROR_SAVE, true))
    };
    function confirm(confirm) {
        if (confirm) {
            transition(DELETING, false);
            props
                .cancelInterview(props.id)
                .then(() => transition(EMPTY))
                .catch(() => transition(ERROR_DELETE, true))
        } else {
            transition(SHOW, true);
        }
    };


    return (
        <>
            <article className="appointment" data-testid="appointment">
                <Header time={props.time} />
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
                {mode === SAVING && <Status message={SAVING} />}
                {mode === DELETING && <Status message={DELETING} />}
                {mode === CONFIRM && (
                    <Confirm
                        message={"Delete the appointment?"}
                        onConfirm={confirm}
                        onCancel={confirm}
                    />
                )}
                {mode === SHOW && (
                    <Show
                        student={props.interview.student}
                        interviewer={props.interview.interviewer}
                        onDelete={() => transition(CONFIRM)}
                        onEdit={() => transition(EDIT)}
                    />
                )}
                {mode === CREATE && (
                    <Form
                        interviewers={props.interviewers}
                        onCancel={() => back()}
                        onSave={save}
                        edit={false}
                    />
                )}
                {mode === EDIT && (
                    <Form
                        name={props.interview.student}
                        interviewer={props.interview.interviewer.id}
                        interviewers={props.interviewers}
                        onCancel={() => back(CREATE)}
                        onSave={save}
                        edit={true}
                    />
                )}
                {mode === ERROR_DELETE && (
                    <Error
                        message={"Failed to cancel."}
                        onClose={() => back()}
                    />
                )}
                {mode === ERROR_SAVE && (
                    <Error
                        message={"Failed to book."}
                        onClose={() => back()}
                    />
                )}
            </article>
        </>
    );
}