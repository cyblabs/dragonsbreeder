import React, { Component } from 'react';
import './App.css';
import {breed} from './main.js';
import {getGenome, parse} from './core.js'
import { Input, Button, Container, Header, Divider, Segment } from 'semantic-ui-react'
const {BODY_PARTS, DRAGON_TYPES, GENE_VA} = require('./constants');



const Result = ({mom, dad}) => {

  return (
    <div className = "Result">
      <Divider horizontal>Per body part</Divider>
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
      <Divider horizontal>Results</Divider>
      <p>The probability of all possible rares: {breed(mom, dad).allPartsProbs}</p>
      <p>The probability of at least one rare: {breed(mom, dad).atLeastOnePartProb}</p>
    </div>
  )
}

class SimpleForm extends React.Component {

  state = {
    firstDragonGenome: null,
    secondDragonGenome: null,
  };

  trueClickHandler = async () => {

    const firstDragonId = this.refs.firstDragonId.value;
    const secondDragonId = this.refs.secondDragonId.value;

    const firstDragonGenome = await getGenome(firstDragonId);
    const secondDragonGenome = await getGenome(secondDragonId);

    this.setState({
      firstDragonGenome,
      secondDragonGenome,
    })
  }

  render() {

    const {firstDragonGenome, secondDragonGenome} = this.state;

    return (
      <div>
      <Segment basic textAlign='center'>
        <input className = "Inputs" placeholder = "dragonID" ref='firstDragonId'/>
        <input className = "Inputs" placeholder = "dragonID" ref='secondDragonId'/>
        <p><Button
          size = 'big'
          color = 'olive'
          onClick = {this.trueClickHandler}
        >
          Lets fuck!
        </Button></p>

        {firstDragonGenome && secondDragonGenome &&
          <Result mom={firstDragonGenome} dad={secondDragonGenome}/>
        }
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
        <Header as='h3'>Put dragon IDes to form fields</Header>
        <p><SimpleForm /></p>
      </div>
    )
  }
}

export default App;
