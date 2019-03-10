import React, { Component } from 'react';
import './animate.css';
import './App.css';
import Card from './Card.js';
import CardData from './api/mock/card-data.js';
import Search from './Search.js';

import ReactMarkdown from 'react-markdown';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends Component {

	constructor(props){
		super(props);
		const startingCard = getRandomInt(CardData.length);
		this.handleOnClickNewCard = this.handleOnClickNewCard.bind(this);
		this.handleOnClickLastCard = this.handleOnClickLastCard.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.handleSearchFocus = this.handleSearchFocus.bind(this);

		this.state = {
			cards : CardData,
			currentCard : startingCard,
			loading : false,
			history : [startingCard],
			searchValue : '',
			searchResults: [],
			searchVisible: false
		};
	}

	handleOnClickNewCard(){

		const self = this;
		const shuffle = false; // old way was random
		if (!shuffle){
			this.setState(state => ({
				loading: true,
				currentCard : (state.currentCard + 1) % state.cards.length,
			}));
			setTimeout(()=>{self.setState({loading: false})}, 500);
			return;
		}
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
		const self = this;
		if (this.state.loading )
			return;
		this.setState(state => ({
			loading: true,
			currentCard: (state.currentCard - 1) >= 0 ? state.currentCard - 1 : (state.cards.length - 1)
		}));
		setTimeout(()=>{self.setState({loading: false})}, 500);
	}
	handleOnClickLastCardWithHistory(){

		var self = this;
		let history = this.state.history.slice();

		history = history.slice(0, history.length - 1);
		const newIndex = history[history.length - 1];

		this.setState({
			loading: true,
			currentCard : newIndex,
			history: history
		});

		setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	handleSearch(e){
		const searchValue = e.target.value.replace(/[^a-zA-Z0-9\s]/, '');
		const currentCard = this.state.currentCard;
		let searchResults = [];
		let searchVisible = false;
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
						<ReactMarkdown source={noResults} />
					</li>
	 			);
			}
			searchVisible = true;
		}
		this.setState({
			searchValue: searchValue,
			searchResults : searchResults,
			searchVisible: searchVisible
		});

	}

	handleClickOutside(e){
		console.log(e, this);
		if ( this.node.contains(e.target) ){
			return;
		} else {
			this.setState({searchVisible: false});
		}
	}

	handleSearchFocus(){
		const searchVisible = this.state.searchVisible;
		const searchResults = this.state.searchResults;
		if ( !searchVisible && searchResults.length > 0 ){
			this.setState({searchVisible: true});
			// document.addEventListener('click', this.handleClickOutside, false);
		}
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
			searchVisible : false
		});
		setTimeout(()=>{self.setState({loading: false})}, 500);

	}

	componentDidMount(){

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
		const searchVisible = this.state.searchVisible;
		const count = this.state.cards.length;

		const onClickNewCard = this.handleOnClickNewCard;
		const onClickLastCard = this.handleOnClickLastCard;
		const lastEnabled = (history.length > 1);
		const handleSearch = (e) => this.handleSearch(e);
		const handleSearchFocus = (e) => this.handleSearchFocus(e);
		const handleClickOutside = (e) => this.handleClickOutside(e);
		const date = new Date()
		const year = date.getFullYear();
		return (
			<div className={classList.join(" ")}>
				<header className="header">
					<div className="card-number">
						Card {cardNumber} of {count}
					</div>
					<Search
						handleSearch={handleSearch} 
						handleSearchFocus={handleSearchFocus} 
						handleClickOutsite={handleClickOutside}
						searchValue={searchValue}
						showSearchResults={searchVisible}
						searchResultsList={searchResults}
					/>
				</header>
				<Card 
					history={history}
					loading={loading}
					content={content}
					cardNumber={cardNumber}
				/>
					<button
						className="last"
						onClick={onClickLastCard}>
					</button>
					<button
						className="new"
						onClick={onClickNewCard}>
					</button>
					<footer>
						&copy; {year} jameel.io
					</footer>
			</div>
		);
	}
}

export default App;
