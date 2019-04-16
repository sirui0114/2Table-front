import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { API_ROOT } from '../constants';
import { message, Form ,Input, Icon} from 'antd';
import $ from 'jquery';

export class ReservationCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.resvDetail.restaurant_Id,
            userId: this.props.userId,
            resvDetail: this. props.resvDetail
        }
      }


    componentDidMount() {

    }

    render() {
        return (
            <Card style={{ width: '18rem', margin: '1rem'}}>
            <Card.Img variant="top" src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" />
            <Card.Body>
            <Card.Title>{this.state.resvDetail.reservation_Time}</Card.Title>
                <Card.Text>
                {this.state.resvDetail.r_item.restaurant}
                <br/>{this.state.resvDetail.r_item.address}
                <br/>contact: {this.state.resvDetail.r_item.phone}
            </Card.Text>
            <Card.Text>
                User : {this.state.resvDetail.u_item.name}
                <br/>contact: {this.state.resvDetail.u_item.phone}
             </Card.Text>
            </Card.Body>
        </Card>
        );
    }
}
