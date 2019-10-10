/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './App.css';

class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09
    },
    haveUsersLocation: false,
    zoom: 2
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUsersLocation: true,
          zoom: 13
        });
      },
      () => {
        console.log('location was not found');
        fetch('https://ipapi.co/json')
          .then(response => response.json())
          .then(location => {
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUsersLocation: true,
              zoom: 13
            });
          });
      }
    );
  }

  formSubmitted = event => {
    event.preventDefault();
  };

  render() {
    const myIcon = L.icon({
      iconUrl: 'http://icon-park.com/imagefiles/location_map_pin_pink5.png',
      iconSize: [25, 41],
      iconAnchor: [12.5, 41],
      popupAnchor: [0, -41]
    });

    const position = [this.state.location.lat, this.state.location.lng];

    return (
      <div>
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUsersLocation ? (
            <Marker position={position} icon={myIcon}>
              <Popup>
                You are here. <br /> Easily customizable.
              </Popup>
            </Marker>
          ) : (
            ''
          )}
        </Map>
        <Card body className="message-form">
          <CardTitle>Welcome to GuestMap!</CardTitle>
          <CardText>Leave a message with your location.</CardText>
          <CardText>Thanks for stopping by!.</CardText>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter Your Name"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter A Message"
              />
            </FormGroup>
            <Button
              type="submit"
              color="info"
              disabled={!this.state.haveUsersLocation}
            >
              Send
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default App;
