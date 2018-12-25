import React, { Component } from 'react';
import './App.css';
import {breed} from './main.js';
import {parse, dragonIm} from './core.js'
import { Input, Button, Container, Header, Divider, Segment } from 'semantic-ui-react'
const {BODY_PARTS, DRAGON_TYPES, GENE_VA} = require('./constants');

const Result = ({mom, dad}) => (
  <div className = "Result">
    <p>The probability of rares in {BODY_PARTS[0]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[0]}</p>
    <p>The probability of rares in {BODY_PARTS[1]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[1]}</p>
    <p>The probability of rares in {BODY_PARTS[2]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[2]}</p>
    <p>The probability of rares in {BODY_PARTS[3]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[3]}</p>
    <p>The probability of rares in {BODY_PARTS[4]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[4]}</p>
    <p>The probability of rares in {BODY_PARTS[5]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[5]}</p>
    <p>The probability of rares in {BODY_PARTS[6]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[6]}</p>
    <p>The probability of rares in {BODY_PARTS[7]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[7]}</p>
    <p>The probability of rares in {BODY_PARTS[8]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[8]}</p>
    <p>The probability of rares in {BODY_PARTS[9]}: {breed(mom, dad).probabilityOfRaresPerBodyPart[9]}</p>
    <p>The probability of all possible rares: {breed(mom, dad).allPartsProob}</p>
    <p>The probability of at least one rare: {breed(mom, dad).atLeastOnePartProb}</p>
  </div>
)

class SimpleForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isClicked: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(state => ({
      isClicked: !state.isClicked
    }));
  }

  state = {
    firstDigit: null,
    secondDigit: null
  };

  onFirstDigitChange = event =>
    this.setState({
      firstDigit: event.target.value
    });

  onSecondDigitChange = event =>
    this.setState({
      secondDigit: event.target.value
    });


  render() {
    return (
      <div>
      <Segment basic textAlign='center'>
        <Input className="Inputs" type="text" onChange={this.onFirstDigitChange} />
        <Input className="Inputs" type="text" onChange={this.onSecondDigitChange} />

      <Divider horizontal>And</Divider>
      {this.state.isClicked && <p><Button size = 'big' color = 'olive' onClick = {this.handleClick}>Let Fuck!</Button></p>}
      {!this.state.isClicked && <p>< Result mom = {this.state.firstDigit.split(',')} dad = {this.state.secondDigit.split(',')} /></p>}
      </Segment>
      </div>
    );
  }
}

class App extends React.Component {
  render () {
    return (
      <div className="App">
        <Header as='h1'>Let breed your dragons!</Header>
        <Header as='h3'>Put dragon ids to form field</Header>
        <p><SimpleForm /></p>
      </div>
    )
  }
}

export default App;
