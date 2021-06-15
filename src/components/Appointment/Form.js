import React, { useState } from "react";
// import classnames from "classnames";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    function newOnCancel() {
        setName("");
        setInterviewer(null);
        props.onCancel(name, interviewer);
    };

    function validate() {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }

        setError("");
        props.onSave(name, interviewer);
    }

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        placeholder="Enter Student Name"
                        value={name}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                        data-testid="student-name-input"
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
                    <Button danger onClick={() => newOnCancel()}>Cancel</Button>
                    <Button confirm onClick={() => validate()}>Save</Button>
                </section>
            </section>
        </main>
    );
}