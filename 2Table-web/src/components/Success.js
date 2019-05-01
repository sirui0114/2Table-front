import React from 'react';
import Image from 'react-bootstrap/Image'
import '../styles/Main.css';
import { Icon } from 'antd';
import backlogo from '../asset/back.svg'
import Button from 'react-bootstrap/Button'

export class Success extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    //fetch
    //setState

  }


  render() {
    return (
        <div>
        <h1>
            Successfully Reserved!
        </h1>
        <br />
        <Button variant="warning" href="/show_res">Show Reservation List</Button>
        <br /><br />
        <Button variant="secondary" href="/home">Back to Home Page</Button>
        <br />
        </div>
    );
  }
}