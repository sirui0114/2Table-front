
import React from 'react';
import '../styles/CarouselHeader.css';
import Carousel from 'react-bootstrap/Carousel'

export class CarouselHeader extends React.Component {
constructor(props) {
        super(props)
        this.state = {
        }
      }

render(){

    return(
        <Carousel className="carou">
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://i.loli.net/2019/04/15/5cb3e0210edb5.jpg" 
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Reserve your seat</h3>
            <p>Choosing 2Table gives you a seamless experience of reserving a seat at a restuarant.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://i.loli.net/2019/05/01/5cc94d776cd8c.jpeg" 
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Eat with your friends</h3>
            <p>Specify a party size up to 7.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 c-img"
            src="https://i.loli.net/2019/05/01/5cc94c0447353.jpg" 
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Do not hesitate!</h3>
            <p>We have Numerous restuarants to let you choose from.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
                );
};
}