import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { RestaurantCard } from './RestaurantCard';
import { API_ROOT } from '../constants';
import $ from 'jquery';
import { message } from 'antd';

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
    // 用ajax从数据库调餐馆的list，setState到resList里面，我这里用了temp测试
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
      <Container>
        <Row>
          {this.state.resList.map((restaurant)=>{
            return <RestaurantCard key={restaurant.restaurant} resDetail={restaurant} userId = {this.props.userId}/>
          })}
        </Row>
      </Container>
    );
  }
}
