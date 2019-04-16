import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { API_ROOT } from '../constants';
import { message, Form ,Input, Icon} from 'antd';
import $ from 'jquery';
import PickyDateTime from 'react-picky-date-time';

const FormItem = Form.Item;

const style = {
    height: '200px',
    width: '200px',
    margin: '2rem'
};

const button_style = {
    margin: '0.5rem',
    backgroundColor: '#222',
    color: '#61dafb',
};
  
const buttonSection = {
     width: '100%',
     height: '20%',
     justifyContent: 'center',
     alignItems: 'center'
};

// todo: could refactor to time slot mode. currently use others' frame for time saving. tho it's not straight forward
var tempTime = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30AM", "11:00AM", "11:30AM", "12:00PM", "12:30PM", "1:00PM",
                "1:30PM", "2:00PM", "3:30PM"]

export class Reserve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userId: this.props.userId,
        id: this.props.resId,
        resInfo: {},
        showPickyDateTime: true,
        date: new Date().getDate().toString(),
        month: (new Date().getMonth() + 1).toString(),
        year: (new Date().getFullYear()).toString(),
        hour: (new Date().getHours()).toString(),
        minute: '00',
        second: '00',
        meridiem: 'PM',
        size: 5,
    }
    this.handleReserve = this.handleReserve.bind(this);
  }

 handleUserInput= event => {
    this.setState({
      size: event.target.value
    });
  }

  componentDidMount() {
    $.ajax({
            url: `${API_ROOT}/searchRes?Id=${this.state.id}`,
            method: 'GET',
            }).then((response) => {
                this.setState({
                    resInfo : JSON.parse(response)
                });
                  console.log(JSON.parse(response));
            },(error) => {
                    message.error(error.responseText);
            }).catch((error) => {
                    console.log(error);
            });
  }

  onYearPicked(res) {
      const { year } = res;
      this.setState({ year: year});
    }

    onMonthPicked(res) {
      const { month, year } = res;
      this.setState({ year: year, month: month});
    }

    onDatePicked(res) {
      const { date, month, year } = res;
      this.setState({ year: year, month: month, date: date });
    }

    onResetDate(res) {
      const { date, month, year } = res;
      this.setState({ year: year, month: month, date: date });
    }

    onResetDefaultDate(res) {
      const { date, month, year } = res;
      this.setState({ year: year, month: month, date: date });
    }

    onHourChange(res) {
      this.setState({ hour: res.value });
    }

    onMeridiemChange(res) {
      this.setState({ meridiem: res });
    }

    onResetTime(res) {
      this.setState({
        second: res.clockHandSecond.value,
        minute: res.clockHandMinute.value,
        hour: res.clockHandHour.value
      });
    }

    onResetDefaultTime(res) {
      this.setState({
        second: res.clockHandSecond.value,
        minute: res.clockHandMinute.value,
        hour: res.clockHandHour.value
      });
    }

    onClearTime(res) {
      this.setState({
        second: res.clockHandSecond.value,
        minute: res.clockHandMinute.value,
        hour: res.clockHandHour.value
      });
    }

    // just toggle your outter component state to true or false to show or hide <PickyDateTime/>
    openPickyDateTime() {
      this.setState({showPickyDateTime: true});
    }

    onClose() {
      this.setState({showPickyDateTime: false});
    }


  handleReserve(e) {
      // 用ajax检查capacity然后reserve餐馆，我直接写了alert测试用
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
            alert("success!");
        },(error) => {
            message.error(error.responseText);
        }).catch((error) => {
            console.log(error);
        });
    }

    e.preventDefault();
  }

  render() {
      const {
        showPickyDateTime,
        date,
        month,
        year,
        hour,
        meridiem,
        minute,
        second
      } = this.state;
      const resInfo = this.state.resInfo;
      console.log(this.state);
    return (
        <Container>
            <Row>
                <Col>
                {/* Col 1 for the Name and Picture of the Restaurant<br /> */}
                    <h1>{resInfo.restaurant}</h1>
                    <img src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" style={style} />
                    <h5>addr:  {resInfo.address}
                    <br/>contact: {resInfo.phone}</h5>
                    </Col>
                <Col>
                        <PickyDateTime
                          size="xs"
                          mode={1}
                          show={showPickyDateTime}
                          locale="en-us"
                          defaultTime={`${hour}:${minute}:${second} ${meridiem}`} // "HH:MM:SS AM"
                          defaultDate={`${month}/${date}/${year}`} // "MM/DD/YYYY"
                          onClose={() => this.setState({ showPickyDateTime: false })}
                          onYearPicked={res => this.onYearPicked(res)}
                          onMonthPicked={res => this.onMonthPicked(res)}
                          onDatePicked={res => this.onDatePicked(res)}
                          onResetDate={res => this.onResetDate(res)}
                          onResetDefaultDate={res => this.onResetDefaultDate(res)}
                          onHourChange={res => this.onHourChange(res)}
                          onMeridiemChange={res => this.onMeridiemChange(res)}
                          onResetTime={res => this.onResetTime(res)}
                          onResetDefaultTime={res => this.onResetDefaultTime(res)}
                          onClearTime={res => this.onClearTime(res)}
                        />
                </Col>
            </Row>
            <Row style = {buttonSection}>
                <div>
                    <h5>party size</h5>
                        <input type="text"
                        onChange={this.handleUserInput}
                         />
                </div>
            </Row>
            <Row style = {buttonSection}>
                <button onClick={this.handleReserve} style={button_style}>
                    Confirm
                </button>
            </Row>
        </Container>
    );
  }
}
export const reserve = Form.create()(Reserve);