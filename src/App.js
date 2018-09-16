import React, { Component } from 'react';
import './animate.css';
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
			currentCard : getRandomInt(CardData.length),
			loading : false,
			history : []
		};
		console.log(this.state.cards, getRandomInt(CardData.length))
	}

	handleOnClick(){
		if (this.state.loading)
			return;
		const current = this.state.currentCard;
		const cards = this.state.cards;
		let newIndex = getRandomInt(cards.length);
		console.log(newIndex, current);
		while ( newIndex === current ){
			newIndex = getRandomInt(cards.length);
		}
		this.setState({
			loading: true,
			currentCard : newIndex
		});
		var self = this;
		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	render() {
		const cards = this.state.cards;
		const currentCard = this.state.currentCard;
		console.log(currentCard);
		const content = cards[currentCard].content;
		const cardNumber = currentCard + 1;
		const classList = ['App', 'test', 'poop'];
		const loading = this.state.loading;
		return (
			<div className={classList.join(" ")}>
				<Card 
					loading={loading}
					content={content}
					cardNumber={cardNumber}
					onClickNextCard={()=>this.handleOnClick()}
				/>
			</div>
		);
	}
}

export default App;
