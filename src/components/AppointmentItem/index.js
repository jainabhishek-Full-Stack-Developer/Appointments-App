import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarted} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarted(id)
  }
  return (
    <li className="appointmentItem">
      <div className="headerContainer">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="starButton"
          onClick={onClickStar}
        >
          <img src={starImgUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
