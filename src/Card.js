import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import ReactMarkdown from 'react-markdown';

library.add(faArrowLeft)
library.add(faRedo)

export default class Card extends React.Component {
	render(){
		const cardNumber = this.props.cardNumber;
		const classes = [
			"card",
			"card-" + cardNumber
		];
		const mainSectionClasses = [
			"main"
		];
		const lastEnabled = (this.props.history.length > 1)
		if ( this.props.loading ){
			mainSectionClasses.push("fadeIn animated");
		}
		return (
			<div className={classes.join(" ")}>
				<header className="header">
					Card #{cardNumber}
				</header>
				<div className={mainSectionClasses.join(" ")}>
					<div className="overlay"></div>
					<ReactMarkdown source={this.props.content} />
				</div>			
				<footer>
					<button disabled={!lastEnabled} className="last" onClick={this.props.onClickLastCard}><FontAwesomeIcon icon="arrow-left" /></button>
					<button className="new" onClick={this.props.onClickNewCard}><FontAwesomeIcon icon="redo" /> New Card</button>
				</footer>
			</div>
		);
	}
}