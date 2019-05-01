import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { API_ROOT } from '../constants';
import { message, Form ,Input, Icon} from 'antd';
import $ from 'jquery';
import '../styles/Main.css';

export class ReservationCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.resvDetail.restaurant_Id,
            userId: this.props.userId,
            resvDetail: this.props.resvDetail
        }
      }


    componentDidMount() {

    }

    render() {
        return (
            <Card border="warning" style={{ width: '100%', margin: '1rem'}} className="show-res-card">
            <Card.Header>{this.state.resvDetail.reservation_Time}</Card.Header>
            {/* <Card.Img variant="top" src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" /> */}
            <Card.Body>
            <Card.Title>{this.state.resvDetail.r_item.restaurant}</Card.Title>
                <Card.Text>
                Address: {this.state.resvDetail.r_item.address}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Restaurant Contact: {this.state.resvDetail.r_item.phone}<strong>
                <br/>Client : {this.state.resvDetail.u_item.name}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Client Contact: {this.state.resvDetail.u_item.phone}</strong>
            </Card.Text>
            {/* <Card.Text>
                User : {this.state.resvDetail.u_item.name}
                <br/>contact: {this.state.resvDetail.u_item.phone}
             </Card.Text> */}
            </Card.Body>
        </Card>
        );
    }
}
