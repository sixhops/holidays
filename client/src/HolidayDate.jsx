import React from 'react';

const HolidayDate = props => {
  var dates;
  if (props.startDate === props.endDate) {
    // one day holiday
    let newDate = new Date(props.startDate)
    let dateStr = newDate.toDateString().split(' ');
    dates = <p>Date: {dateStr[1] + ' ' + dateStr[2]}</p>
  } else {
    // multi-day holiday
    let newStartDate = new Date(props.startDate)
    let newEndDate = new Date(props.endDate)
    let startDateStr = newStartDate.toDateString().split(' ');
    let endDateStr = newEndDate.toDateString().split(' ');
    dates = <p>Begins: {startDateStr[1] + ' ' + startDateStr[2]} Ends: {endDateStr[1] + ' ' + endDateStr[2]}</p>
  }
  return dates
}

export default HolidayDate;
