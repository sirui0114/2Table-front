import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class RestaurantCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.resDetail.id,
            userId: this.props.userId,

        }
      }
    
    
    componentDidMount() {
        //Fetch
        // Setstate·
    }

    getReserveLink(id, userId) {
        // generate link by id
        const link = "/reserve/" + id + "&" + userId
        return link 
    }

    render() {

        console.log(this.props.resDetail.url)
        const link = this.getReserveLink(this.state.id, this.state.userId)
        return (
        // <a href={link} className="h-a-null">
            <Card className="r-card" style={{ width: '30%', height:'300px', margin: '1rem'}}>
            <a href={link}><Card.Img style={{ height:'180px', objectFit: 'cover'}} variant="top" src= {this.props.resDetail.url}/></a>
            <a href={link}><Card.Body>
            <Card.Title>{this.props.resDetail.restaurant}</Card.Title>
            <Card.Text>
                {this.props.resDetail.address}
                <br/>contact: {this.props.resDetail.phone}
            </Card.Text>
            {/* <Button variant="primary" href={link}>Reserve</Button> */}
            </Card.Body></a>
        </Card>
        // </a>
        );
    }
}
