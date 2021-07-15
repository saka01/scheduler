import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
  const handleNameChange = (event) => {
		setName(event.target.value);
  };
  
  //Validate and handle save click event
	const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("An interviewer must be selected");
      return;
    }
		setError("");
    props.onSave(name, interviewer);
  }

  return (
<main className="appointment__card appointment__card--create">
  <section  className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
            name="studentname"
            data-testid="student-name-input"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={handleNameChange}
        /*
          This must be a controlled component
        */
      />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
        
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>
);
}