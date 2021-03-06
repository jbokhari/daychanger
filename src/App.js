import React, { Component } from 'react';
import './animate.css';
import './App.css';
import Card from './Card.js';
import CardData from './api/mock/card-data.js';
import Modal from './Modal.js';
import Search from './Search.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import ReactMarkdown from 'react-markdown';


library.add(faInfoCircle)

const WEBSITE_INFO = `#### Turn your day around

*Day Changer* delivers a positive message that kicks your mind into a new and powerful direction. It contains phrases to change the trajectory of your day for the better.

The idea was inspired by [Oblique Strategies](https://en.wikipedia.org/wiki/Oblique_Strategies) by Brian Enos and various books on self-development.

The app, made in React, is also a way for me to test my design and coding skills.

[View on github](https://github.com/jbokhari/daychanger)`;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
document.addEventListener("touchstart", function(){}, true);

class App extends Component {

	constructor(props){
		super(props);
		const startingCard = getRandomInt(CardData.length);
		this.handleOnClickNewCard = this.handleOnClickNewCard.bind(this);
		this.handleOnClickLastCard = this.handleOnClickLastCard.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleClickOutsideSearch = this.handleClickOutsideSearch.bind(this);
		this.handleClickOutsideModal = this.handleClickOutsideModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
		this.handleSearchFocus = this.handleSearchFocus.bind(this);
		this.loadTimer = null;
		this.searchbox = React.createRef();
		this.modal = React.createRef();

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
		clearTimeout(this.loadTimer);
		const shuffle = false; // old way was random
		if (!shuffle){
			this.setState(state => ({
				loading: true,
				currentCard : (state.currentCard + 1) % state.cards.length,
			}));
			this.loadTimer = setTimeout(()=>{self.setState({loading: false})}, 500);
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
		this.loadTimer = setTimeout(()=>{self.setState({loading: false})}, 500);
	}

	handleOnClickLastCard(){
		const self = this;
		clearTimeout(this.loadTimer);
		this.setState(state => ({
			loading: true,
			currentCard: (state.currentCard - 1) >= 0 ? state.currentCard - 1 : (state.cards.length - 1)
		}));
		this.loadTimer = setTimeout(()=>{self.setState({loading: false})}, 500);
	}
	
	openModal(e){
		e.preventDefault();
		this.setState( {
			modalOpen: true
		})
	}
	closeModal(e){
		e.preventDefault();
		this.setState( {
			modalOpen: false
		})
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
			document.addEventListener('click', this.handleClickOutsideSearch, false);
		} else {
			document.removeEventListener('click', this.handleClickOutsideSearch, false);
		}
		this.setState({
			searchValue: searchValue,
			searchResults : searchResults,
			searchVisible: searchVisible
		});

	}

	handleClickOutsideModal(e){
		console.log(this.modal.current);
		if ( this.modal && this.modal.current.contains(e.target) ){
			return;
		} else {
			this.setState({modalOpen: false});
		}
	}
	handleClickOutsideSearch(e){
		if ( this.searchbox.current.contains(e.target) ){
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
		if ( index === currentCard ){
			this.setState({
				searchVisible : false
			});
			return;
		}

		history = history.concat(index);
		clearTimeout(this.loadTimer);
		this.setState({
			loading: true,
			currentCard : index,
			history: history,
			searchVisible : false
		});
		this.loadTimer = setTimeout(()=>{self.setState({loading: false})}, 500);

	}

	componentDidMount(){
		this.loadTimer = setTimeout(()=>{this.setState({loading: false})}, 500);
	}
	render() {
		const cards = this.state.cards;
		const currentCard = this.state.currentCard;
		const content = cards[currentCard].content;
		const cardNumber = currentCard + 1;
		const classList = ['App', this.state.loading ? "loading" : ""];
		const loading = this.state.loading;
		const history = this.state.history;
		const searchValue = this.state.searchValue;
		const searchResults = this.state.searchResults;
		const searchVisible = this.state.searchVisible;
		const count = this.state.cards.length;

		const onClickNewCard = this.handleOnClickNewCard;
		const onClickLastCard = this.handleOnClickLastCard;
		const lastEnabled = (history.length > 1);
		const handleSearch = this.handleSearch;
		const handleSearchFocus = this.handleSearchFocus;
		const handleClickOutsideSearch = this.handleClickOutsideSearch;
		const openModal = this.openModal;
		const closeModal = this.closeModal;
		const modalOpen = this.state.modalOpen;

		const info = WEBSITE_INFO;
		const card = (
			<Card 
				history={history}
				loading={loading}
				content={content}
				cardNumber={cardNumber}
			/>
		);
		const modal = (
			<div ref={this.modal}>
				<Modal 
					onClickOutside={this.handleClickOutsideModal}
					closeModal={closeModal}
					info={info}
				/>
			</div>
		);

		const date = new Date()
		const year = date.getFullYear();
		const mainContent = ( modalOpen ? modal : card);
		return (
			<div className={classList.join(" ")}>
				<header className="header">
					<div className="t-left">
						<div className="card-number">
							Card {cardNumber} of {count} 
						</div>
						<div className="info">
							<a className="info" href="#" onClick={openModal}><FontAwesomeIcon icon="info-circle" /></a>
						</div>
					</div>
					<section ref={this.searchbox} className="search">
					
						<Search
							
							handleClickOutsideSearch={handleClickOutsideSearch} 
							handleSearch={handleSearch} 
							handleSearchFocus={handleSearchFocus} 
							searchValue={searchValue}
							showSearchResults={searchVisible}
							searchResultsList={searchResults}
						/>
					</section>
				</header>
				{mainContent}
				<span
					className="button last"
					onClick={onClickLastCard}>
				</span>
				<span
					className="button new"
					onClick={onClickNewCard}>
				</span>
				<footer>
					&copy; {year} jameel.io
				</footer>
				
			</div>
		);
	}
}

export default App;
