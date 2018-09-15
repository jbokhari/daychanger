import React, { Component } from 'react';
import './App.css';
import Card from './Card.js';
import CardData from './api/mock/card-data.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends Component {

	constructor(props){
		super(props);
		this.state = {
			cards : CardData,
			currentCard : getRandomInt(CardData.length)
		};
		console.log(this.state.cards, getRandomInt(CardData.length))
	}

	handleOnClick(){
		const current = this.state.currentCard;
		const cards = this.state.cards;
		let newIndex = getRandomInt(cards.length);
		console.log(newIndex, current);
		while ( newIndex === current ){
			newIndex = getRandomInt(cards.length);
		}
		this.setState({
			currentCard : newIndex
		});
	}

	render() {
		const cards = this.state.cards;
		const currentCard = this.state.currentCard;
		console.log(currentCard);
		const content = cards[currentCard].content;
		const cardNumber = currentCard + 1;
		return (
			<div className="App">
				<Card 
					content={content}
					cardNumber={cardNumber}
					onClickNextCard={()=>this.handleOnClick()}
				/>
			</div>
		);
	}
}

export default App;
