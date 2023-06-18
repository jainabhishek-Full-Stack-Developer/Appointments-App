import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarted = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filterFilled' : 'filterEmpty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()
    return (
      <>
        <div className="bgContainer">
          <div className="responsiveContainer">
            <div className="appointmentsContainer">
              <div className="addAppointmentContainer">
                <form className="form" onSubmit={this.onAddAppointment}>
                  <h1 className="addHeading">Add Appointment</h1>
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={titleInput}
                    onChange={this.onChangeTitleInput}
                    className="input"
                    placeholder="Title"
                    autoComplete="OFF"
                  />
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={dateInput}
                    onChange={this.onChangeDateInput}
                    className="input"
                  />
                  <button type="submit" className="addButton">
                    Add
                  </button>
                </form>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                  className="appointmentsImage"
                />
              </div>
              <hr className="hr" />
              <div className="headerWithFilter">
                <h1 className="appointHeading">Appointments</h1>
                <button
                  type="button"
                  className={`filterStyle ${filterClassName}`}
                  onClick={this.onClickFilter}
                >
                  Starred
                </button>
              </div>
              <ul className="appointmentList">
                {filteredAppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    key={eachAppointment.id}
                    appointmentDetails={eachAppointment}
                    toggleIsStarted={this.toggleIsStarted}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Appointments
