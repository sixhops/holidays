import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class HolidayList extends React.Component {
  state = {
    holidays: [],
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  }

  componentDidMount = () => {
    axios.get('/api/holidays')
      .then(response => {
        this.setState({
          holidays: response.data
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date
    })
  }
  handleEndDateChange = (date) => {
    this.setState({
      endDate: date
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const holidaysCopy = [...this.state.holidays]
    axios.post('/api/holidays', {
      name: this.state.name,
      description: this.state.description,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }).then(response => {
      holidaysCopy.push(response.data)
      this.setState({
        holidays: holidaysCopy,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date()
      })
    })
  }

  render() {
    const mappedHolidays = this.state.holidays.map((holiday, id) => (
      <div key={id}><Link to={`/holidays/${holiday._id}`}>{holiday.name}</Link><br /></div>
    ))
    return (
      <>
        <p>I am the HolidayList</p>
        {mappedHolidays}
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} name="name" value={this.state.name} /><br />
          <input type="text" onChange={this.handleChange} name="description" value={this.state.description} /><br />
          <DatePicker onChange={this.handleStartDateChange} selected={this.state.startDate} />
          <DatePicker onChange={this.handleEndDateChange} selected={this.state.endDate} /><br />
          <input type="submit" value="Add Holiday"/>
        </form>
      </>
    )
  }
}

export default HolidayList;
