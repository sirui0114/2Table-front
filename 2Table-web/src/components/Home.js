import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RestaurantCard } from './RestaurantCard';
import { API_ROOT } from '../constants';
import $ from 'jquery';
import { message } from 'antd';
import { CarouselHeader } from './CarouselHeader';

import '../styles/Home.css';

export class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        resList : []
    }
  }

  componentDidMount() {
    //fetch
    //setState
    $.ajax({
        url: `${API_ROOT}/searchRes`,
        method: 'GET',
        }).then((response) => {
            console.log(JSON.parse(response));
            this.setState({
                resList : JSON.parse(response)
            });
        },(error) => {
                message.error(error.responseText);
        }).catch((error) => {
                console.log(error);
        });
  }


  render() {
    return (
      <div>
      <CarouselHeader />
      <Container>
        <div>
          <h2 className="h-h2">Popular Restaurants</h2>
          <hr />
        </div>
        <Row>
          {this.state.resList.map((restaurant)=>{
            return <RestaurantCard key={restaurant.restaurant} resDetail={restaurant} userId = {this.props.userId}/>
          })}
        </Row>
      </Container>
      </div>
    );
  }
}
