import React from 'react';
import axios from 'axios';
import Tradition from './Tradition';
import HolidayDate from './HolidayDate';
import { Link } from 'react-router-dom';

class HolidayShow extends React.Component {
  state = {
    holiday: null,
    name: '',
    description: ''
  }
  componentDidMount = () => {
    axios.get(`/api/holidays/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          holiday: response.data
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/api/holidays/${this.props.match.params.id}/traditions`, {
      name: this.state.name,
      description: this.state.description
    }).then(response => {
      this.setState({
        holiday: response.data,
        name: '',
        description: ''
      })
    })
  }

  // TODO: This component really needs to be three
  render() {
    var holidayData;
    if (this.state.holiday) {
      // Map all traditions into their own elements
      var traditions = this.state.holiday.traditions.map((tradition, id) => (
        <Tradition tradition={tradition} key={id} />
      ))
      
      holidayData = (
        <>
          <h1>{this.state.holiday.name}</h1>
          <p>{this.state.holiday.description}</p>
          <HolidayDate startDate={this.state.holiday.startDate} endDate={this.state.holiday.endDate} />
          <Link to={`/holidays/edit/${this.state.holiday._id}`}>Edit this holiday</Link>
          {traditions}
        </>
      )
    } else {
      holidayData = <p>Loading...</p>
    }
    return (
      <>
        {holidayData}
        <hr />
        <form onSubmit={this.handleSubmit} >
          <input type="text" onChange={this.handleChange} name='name' value={this.state.name} /><br />
          <input type="text" onChange={this.handleChange} name='description' value={this.state.description} /><br />
          <input type="submit" value="Add Tradition" />
        </form>
      </>
    )
  }
}

export default HolidayShow;
