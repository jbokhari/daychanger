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
		const startingCard = getRandomInt(CardData.length);
		this.state = {
			cards : CardData,
			currentCard : startingCard,
			loading : false,
			history : [startingCard]
		};
	}

	handleOnClickNewCard(){

		var self = this;
		const cards = this.state.cards;
		let history = this.state.history.slice();
		if (this.state.loading || history.length >= cards.length )
			return;

		const current = this.state.currentCard;
		let newIndex = getRandomInt(cards.length);
		while ( history.indexOf(newIndex) !== -1 ){
			newIndex = getRandomInt(cards.length);
		}
		history = history.concat(newIndex);
		console.log(history);
		this.setState({
			loading: true,
			currentCard : newIndex,
			history: history
		});
		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	handleOnClickLastCard(){

		var self = this;
		const cards = this.state.cards;
		let history = this.state.history.slice();
		if (this.state.loading || history.length <= 1 )
			return;

		const current = this.state.currentCard;
		history = history.slice(0, history.length - 1);
		const newIndex = history[history.length - 1];

		this.setState({
			loading: true,
			currentCard : newIndex,
			history: history
		});

		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	render() {
		const cards = this.state.cards;
		const currentCard = this.state.currentCard;
		const content = cards[currentCard].content;
		const cardNumber = currentCard + 1;
		const classList = ['App', 'test', 'poop'];
		const loading = this.state.loading;
		const history = this.state.history;
		return (
			<div className={classList.join(" ")}>
				<Card 
					history={history}
					loading={loading}
					content={content}
					cardNumber={cardNumber}
					onClickNewCard={()=>this.handleOnClickNewCard()}
					onClickLastCard={()=>this.handleOnClickLastCard()}
				/>
			</div>
		);
	}
}

export default App;
