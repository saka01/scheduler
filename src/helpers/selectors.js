const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};
//... returns an array of appointments for that day
  function getAppointmentsForDay(state, day) {
  const appointments = []

  if (state.days === undefined) {
    return appointments;
  }

  let selectedDay;

  state.days.forEach(element => {
    if (day === element.name) {
      selectedDay = element
    }
  })

  if (selectedDay === undefined) {
    return appointments;
  }

    selectedDay.appointments.forEach(element => {
      if (state.appointments[element]) {
        appointments.push(state.appointments[element])
      }
    });

    return appointments;
}

 function getInterview(state, interview){

  if (interview !== null) {
    const interviewInfo = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
    return interviewInfo
  }

 return null;
 }

const getInterviewersForDay = (state, day) => {
	const days = [...state.days];
	const interviewers = { ...state.interviewers };
	let results = [];
	const filteredDay = days.filter((item) => item.name === day);
	const interviewerIds =
		filteredDay.length !== 0 ? filteredDay[0].interviewers : [];
	for (const interviewer in interviewers) {
		if (interviewerIds.includes(interviewers[interviewer].id)) {
			results.push(interviewers[interviewer]);
		}
	}
	return results;
};
module.exports = {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
}