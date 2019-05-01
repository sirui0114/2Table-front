import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { API_ROOT } from '../constants';
import { message, Form ,Input, Icon} from 'antd';
import $ from 'jquery';
import {TimePicker} from './TimePicker';
import Image from 'react-bootstrap/Image'
import '../styles/Main.css';
import backlogo from '../asset/back.svg'
import Clock from 'react-live-clock';


const FormItem = Form.Item;

// const style = {
//     height: '200px',
//     margin: '2rem',
// };

export class Reserve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userId: this.props.userId,
        id: this.props.resId,
        resInfo: {},
    }
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

  render() {
      const resInfo = this.state.resInfo;
      console.log(this.state.resInfo);
    return (
      <div>
        <Container className = "reserve-container">

            <Row>
                <Col xs={7} className="reserve-col1">
                    <h1>{resInfo.restaurant}</h1><hr/>
                {/* Col 1 for the Name and Picture of the Restaurant<br /> */}
                    <h5>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Checkers Drive-In Restaurants, Inc., 
                      is one of the largest chains of double drive-thru restaurants in the United States. 
                      The company operates Checkers and Rally's restaurants in 28 states and the District of Columbia. 
                      They specialize in hamburgers, hot dogs, french fries, and milkshakes.</h5>

                    <img src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" className="reserve-img" />
                    <p>address:  {resInfo.address}
                    <br/>phone: {resInfo.phone}
                    <br/>email: {resInfo.email}</p>
                    </Col>
                <Col xs={5}>
                  <TimePicker 
                    resId = {this.state.id}
                    userId = {this.state.userId}
                  />
                  <br/>
                  <h5>Current Time</h5>
                  <h2><Clock format={'HH:mm:ss'} ticking={true} timezone={'America/New_York'} /> <br/><br/></h2>
                  <a className="reserve-back" href="/home">
                    <Image src={backlogo} rounded />&nbsp;&nbsp;Back
                  </a>
                </Col>
            </Row>
        </Container>
        </div>
    );
  }
}
export const reserve = Form.create()(Reserve);