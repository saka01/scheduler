import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
	//Set initial state
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		// interviewers: {},
		// interviewersForDay: [],
	});

	function updateSpots(id, isBooking) {
		const days = [...state.days];

		for (const day of days) {
			if (day.appointments.includes(id)) {
				isBooking ? day.spots-- : day.spots++;
			}
		}

		return days;
	}

	// const bookInterview = (id, interview, isEdit) => {
	// 	const newAppointment = {
	// 		...state.appointments[id],
	// 		interview: { ...interview },
	// 	};
	// 	const appointments = {
	// 		...state.appointments,
	// 		[id]: newAppointment,
	// 	};
	// 	return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
	// 		const days = isEdit ? [...state.days] : updateSpots(id, true);
	// 		return setState({
	// 			...state,
	// 			days,
	// 			appointments,
	// 		});
	// 	});
  // };
  
  function bookInterview(id, interview) {
    
    console.log(id, interview);

		const newAppointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: newAppointment,
    };
    
    console.log(newAppointment)
    console.log(appointments)


    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      
      setState({
        ...state,
        // days,
        appointments,
      });
      
		});

  };

	const setDay = (day) => setState((prev) => ({ ...prev, day }));

	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		return axios.delete(`/api/appointments/${id}`).then(() => {
			const days = updateSpots(id, false);
			setState({ ...state, days, appointments });
		});
	};
	//Fetch data from API
	useEffect(() => {
		Promise.all([
			axios.get("/api/days"),
			axios.get("/api/appointments"),
			axios.get("/api/interviewers"),
		])
			.then((data) => {
				setState((prev) => ({
					...prev,
					days: data[0].data,
					appointments: data[1].data,
					interviewers: data[2].data,
				}));
			})
			.catch((e) => console.log(e));
	}, []);
	return {
		state,
		setDay,
		bookInterview,
		cancelInterview,
	};
}