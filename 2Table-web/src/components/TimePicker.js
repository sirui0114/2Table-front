import React from 'react';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { API_ROOT } from '../constants';

import { message,Input, Icon} from 'antd';
import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export class TimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),
            selectedTime: new Date(),
            startDate: new Date(),
            date: new Date().getDate().toString(),
            month: (new Date().getMonth() + 1).toString(),
            year: (new Date().getFullYear()).toString(),
            hour: (new Date().getHours()).toString(),
            minute: (Math.floor(new Date().getMinutes()/30)*30).toString(),
            second: '00',
            size: 1,
            
            userId: this.props.userId,
            id: this.props.resId,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeSlot = this.handleTimeSlot.bind(this);
        this.handleSize = this.handleSize.bind(this);
        this.handleReserve = this.handleReserve.bind(this);
    }
        
    handleChange(date) {
        this.setState({
            selectedDate: date,
            date: date.getDate().toString(),
            month: (date.getMonth() + 1).toString(),
            year: (date.getFullYear()).toString(),
        });
    }

    handleTimeSlot(time) {
        this.setState({
            selectedTime: time,
            hour: time.getHours().toString(),
            minute: (time.getMinutes()).toString(),
        });

    }

    handleSize(e) {
        this.setState({
            size: e.target.value,
        });
    }

    handleReserve(e) {
      var pickTime = new Date(this.state.year, this.state.month, this.state.date, this.state.hour, this.state.minute, this.state.second, 0);
      console.log('Received time of form: ', pickTime);
      if (pickTime.getTime() <= new Date().getTime()){
           alert("please select time after current time")
      }else {
          const time = `${this.state.year}-${this.state.month}-${this.state.date} ${this.state.hour}:${this.state.minute}:${this.state.second}`
          const size = this.state.size;
          $.ajax({
              url: `${API_ROOT}/setReservation`,
                  method: 'POST',
                  data: JSON.stringify({
                      res_id: this.state.id,
                      user_id: this.state.userId,
                      size: this.state.size,
                      pdatetime: time,
                  }),
          }).then((response) => {
            //   alert("success!");
              window.location.href = '/success'
          },(error) => {
              message.error(error.responseText);
          }).catch((error) => {
              console.log(error);
          });
      }
  
      e.preventDefault();
    }
    
    
    componentDidMount() {
        //Fetch
        // Setstate·
    }


    render() {
        var today = new Date()
        var weeksLater = new Date()
        weeksLater.setDate(weeksLater.getDate() + 14)
        var openTime = new Date()
        openTime.setHours(12, 0, 0)
        var nowTime = new Date()
        nowTime.setHours(nowTime.getHours(),nowTime.getMinutes() + 15,0)
        var closeTime = new Date()
        closeTime.setHours(22, 40, 0)
        if (parseInt(this.state.date)!=today.getDate() || (parseInt(this.state.month)-1)!=today.getMonth()) {
            nowTime = openTime
        }
        else if (nowTime>closeTime)
            nowTime = closeTime;


        return (
            <Card style={{ width: '24rem', height:'19rem',margin: '1rem'}}>
            <Card.Title style={{ marginTop: '1rem'}}>Make a Reservation</Card.Title>
            <Form style={{ margin: '0 1rem'}}>
                <Form.Group controlId="picker.PartySize">
                    <Form.Label>Party Size</Form.Label>
                    <Form.Control as="select" onChange={this.handleSize}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    </Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                <Form.Group controlId="picker.Date">
                    <Form.Label>Date</Form.Label><br />
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleChange}
                        className="form-control"
                        minDate={new Date()}
                        maxDate={weeksLater}
                        todayButton={"Today"}
                    />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="picker.Time">
                    <Form.Label>Time</Form.Label>
                    <DatePicker
                        selected={this.state.selectedTime}
                        onChange={this.handleTimeSlot}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeFormat="h:mm aa"
                        dateFormat="h:mm aa"
                        timeCaption="Select Time"
                        className="form-control"
                        minTime={nowTime}
                        maxTime={closeTime}
                    />
                </Form.Group>
                </Col>
                </Row>
            </Form>
            <Button style={{margin:'1rem'}} variant="warning" onClick={this.handleReserve}>Reserve</Button>
            </Card>
        );
    }
}