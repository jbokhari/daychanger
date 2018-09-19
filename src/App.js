import React, { Component } from 'react';
import './animate.css';
import './App.css';
import Card from './Card.js';
import CardData from './api/mock/card-data.js';

import ReactMarkdown from 'react-markdown';

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
			history : [startingCard],
			searchValue : '',
			searchResults: [],
			showSearchResults: false
		};
	}

	handleOnClickNewCard(){

		var self = this;
		const cards = this.state.cards;
		let history = this.state.history.slice();

		let historyFiltered = Array.from( new Set(history) );

		if (this.state.loading || historyFiltered.length >= cards.length )
			return;

		let newIndex = getRandomInt(cards.length);
		while ( history.indexOf(newIndex) !== -1 ){
			newIndex = getRandomInt(cards.length);
		}
		history = history.concat(newIndex);
		this.setState({
			loading: true,
			currentCard : newIndex,
			history: history,
		});
		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	handleOnClickLastCard(){

		var self = this;
		let history = this.state.history.slice();
		if (this.state.loading || history.length <= 1 )
			return;

		history = history.slice(0, history.length - 1);
		const newIndex = history[history.length - 1];

		this.setState({
			loading: true,
			currentCard : newIndex,
			history: history
		});

		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	clearSearch(){
		this.setState({
			searchValue: ''
		});
	}

	gotToCard(index){

		var self = this;
		let history = this.state.history.slice();
		const currentCard = this.state.currentCard;
		if ( this.state.loading || index === currentCard )
			return;

		history = history.concat(index);
		this.setState({
			loading: true,
			currentCard : index,
			history: history,
			showSearchResults : false
		});
		setTimeout(()=>{self.setState({loading: false})}, 500);

	}

	handleSearch(e){
		const searchValue = e.target.value.replace(/[^a-zA-Z0-9\s]/, '');
		const currentCard = this.state.currentCard;
		let searchResults = [];
		let showSearchResults = false;
		if ( e.target.value.length > 2 ){
			const cards = this.state.cards.slice();
			
			for (let i = cards.length - 1; i >= 0; i--) {
				let content = cards[i].content;
				let markedContent = cards[i].content;
			 	if (content.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1){
			 		const regEx = new RegExp('\\*{0,2}' + searchValue + '\\*{0,2}', "gi");
			 		markedContent = markedContent.replace(/(\*|\n|-\s)/g, '');
			 		markedContent = markedContent.replace(regEx, (r) => {
			 			return "**" + r + "**";
			 		});

			 		searchResults.push(
						<li className={currentCard === i ? "active" : ""} key={i} onClick={()=>this.gotToCard(i)}>
							<ReactMarkdown 
								source={markedContent}
							/>
							<div className="overlay"></div>
						</li>
		 			);
						
			 	}
			}
			if (!searchResults.length){
				let noResults = "Sorry, no results were found :(";
				searchResults.push(
					<li key={0}>
						<ReactMarkdown 
							source={noResults}
						/>
					</li>
	 			);
			}
			showSearchResults = true;
		}
		this.setState({
			searchValue: searchValue,
			searchResults : searchResults,
			showSearchResults: showSearchResults
		});

	}

	handleSearchBlur(){
		// Ruh roh! apparently blur happens before the click event 
		// (eg search result item) ... hmm
		// const showSearchResults = this.state.showSearchResults;
		// if ( showSearchResults )
		// 	this.setState({showSearchResults: false});
	}

	handleSearchFocus(){
		const showSearchResults = this.state.showSearchResults;
		const searchResults = this.state.searchResults;
		if ( !showSearchResults && searchResults.length > 0 )
			this.setState({showSearchResults: true});
	}

	render() {
		const cards = this.state.cards;
		const currentCard = this.state.currentCard;
		const content = cards[currentCard].content;
		const cardNumber = currentCard + 1;
		const classList = ['App'];
		const loading = this.state.loading;
		const history = this.state.history;
		const searchValue = this.state.searchValue;
		const searchResults = this.state.searchResults;
		const showSearchResults = this.state.showSearchResults;
		return (
			<div className={classList.join(" ")}>
				<Card 
					history={history}
					loading={loading}
					content={content}
					cardNumber={cardNumber}
					searchValue={searchValue}
					handleSearch={(e)=>this.handleSearch(e)}
					handleSearchBlur={(e)=>this.handleSearchBlur(e)}
					handleSearchFocus={(e)=>this.handleSearchFocus(e)}
					onClickNewCard={()=>this.handleOnClickNewCard()}
					onClickLastCard={()=>this.handleOnClickLastCard()}
					showSearchResults={showSearchResults}
					searchResultsList={searchResults}
				/>
			</div>
		);
	}
}

export default App;
