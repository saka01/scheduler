import React from 'react';
// import classNames from 'classnames';

// import 'Appointment/styles.scss';

export default function Header(props) {

    // const lastAppt = classNames({
    //   'last-of-type': props.id === "last"
    // });

    
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
    );
  
}