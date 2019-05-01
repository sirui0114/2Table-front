import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import { ReservationCard } from './ReservationCard';
import { API_ROOT } from '../constants';
import $ from 'jquery';
import { message } from 'antd';
import backlogo from '../asset/back.svg'

import '../styles/Main.css';

export class ShowReserve extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        userId: localStorage.getItem('userId'),
        resvList: [],
    }
  }

  componentDidMount() {
    //fetch
    //setState

    var clientT = localStorage.getItem('Client') === 'user' ? 'u_Id' : 'r_Id';
    console.log(`${API_ROOT}/viewReservation?${clientT}=${localStorage.getItem('userId')}`);
    $.ajax({
                url: `${API_ROOT}/viewReservation?${clientT}=${localStorage.getItem('userId')}`,
                method: 'GET',
                }).then((response) => {
                    this.setState({
                        resvList : JSON.parse(response)
                    });
                      console.log(JSON.parse(response));
                },(error) => {
                        message.error(error.responseText);
                }).catch((error) => {
                        console.log(error);
                });

  }


  render() {
    console.log(this.state.resvList[0])
    if (this.state.resvList[0]!=undefined) {
      var userName = this.state.resvList[0].u_item.name
      var userPhone = this.state.resvList[0].u_item.phone
    }
    return (
      <Container>
         <div className="show-res-h1">
        <h1>
            Reservation List
        </h1> 
        <hr />
        <a className="reserve-back" href="/home">
                    <Image src={backlogo} rounded />&nbsp;&nbsp;Back
        </a>
        </div>
        <Row>
          {this.state.resvList.map((reservation)=>{
            // console.log(reservation)
            return <ReservationCard key={reservation.reservation_Id} resvDetail={reservation} userId = {this.state.userId}/>
          })}
        </Row>
      </Container>
    );
  }
}