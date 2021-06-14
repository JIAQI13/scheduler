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

    function updateSpots() {

    }

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

    function destroy(event) {
        transition(DELETING, true);
        props
            .cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(error => transition(ERROR_DELETE, true));
    }


    return (
        <>
            <article className="appointment" data-testid="appointment">
                <Header time={props.time} />
                {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
                {mode === SAVING && <Status message={SAVING} />}
                {mode === DELETING && <Status message={DELETING} />}
                {mode === CONFIRM && (
                    <Confirm
                        message={"Are you sure you would like to delete?"}
                        onConfirm={destroy}
                        onCancel={() => back()}
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
                        message={"Error."}
                        onClose={() => back()}
                    />
                )}
                {mode === ERROR_SAVE && (
                    <Error
                        message={"Error."}
                        onClose={() => back()}
                    />
                )}
            </article>
        </>
    );
}