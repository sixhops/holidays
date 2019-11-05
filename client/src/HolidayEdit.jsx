import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Redirect } from 'react-router-dom';

class HolidayEdit extends React.Component {
  state = {
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    redirect: ''
  }

  componentDidMount = () => {
    axios.get(`/api/holidays/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          description: response.data.description,
          startDate: new Date(response.data.startDate),
          endDate: new Date(response.data.endDate),
          redirect: ''
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
    axios.put(`/api/holidays/${this.props.match.params.id}`, this.state)
      .then(response => {
        this.setState({
          redirect: <Redirect to={`/holidays/${this.props.match.params.id}`} />
        })
      })
  }

  render() {
    var output;
    if (this.state.redirect) {
      output = this.state.redirect
    } else {
      output = (
        <>
          <h2>Edit this Holiday:</h2>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><br />
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /><br />
            <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange} />
            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange} />
            <input type="submit" value="Update" />
          </form>
        </>
      )
    }
    return (
      <div>
        {output}
      </div>
    )
  }
}

export default HolidayEdit;
