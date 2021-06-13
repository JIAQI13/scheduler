import React, { useState } from "react";
// import classnames from "classnames";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    function validate() {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }

        if (interviewer === null) {
            setError("You should select an interviewer");
            return;
        }

        props.onSave(name, interviewer);
    };


    const cancel = () => {
        setName("");
        setInterviewer(null);
        props.onCancel();
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name={name}
                        type="text"
                        placeholder="Enter Student Name"
                        onChange={e => setName(e.target.value)}
                    />
                </form >
                <section className="appointment__validation">{error}</section>
                <InterviewerList
                    interviewers={props.interviewers}
                    interviewer={interviewer}
                    onChange={setInterviewer} />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={cancel}>Cancel</Button>
                    <Button confirm onClick={() => validate()}>Save</Button>
                </section>
            </section>
        </main>
    );
}