import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ReservationCard } from './ReservationCard';
import { API_ROOT } from '../constants';
import $ from 'jquery';
import { message } from 'antd';

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
    // 用ajax从数据库调餐馆的list，setState到resList里面，我这里用了temp测试

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
    return (
      <Container>
        <h2 >
            Reservation list
        </h2>
        <Row>
          {this.state.resvList.map((reservation)=>{

            return <ReservationCard key={reservation.idReservation} resvDetail={reservation} userId = {this.state.userId}/>
          })}
        </Row>
      </Container>
    );
  }
}