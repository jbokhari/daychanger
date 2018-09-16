import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft)
library.add(faRedo)

export default class Card extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const header = "";
		const content = "";
		const footer = "";
		const cardNumber = this.props.cardNumber;
		const classes = [
			"card",
			"card-" + cardNumber
		];
		const mainSectionClasses = [
			"main"
		];
		if ( this.props.loading ){
			mainSectionClasses.push("fadeIn animated");
		}
		return (
			<div className={classes.join(" ")}>
				<header className="header">
					Card #{cardNumber}
				</header>
				<div className={mainSectionClasses.join(" ")}>
					{this.props.content}
				</div>			
				<footer>
					<button onClick={this.props.onClickNextCard}><FontAwesomeIcon icon="redo" /> New Card</button>
				</footer>
			</div>
		);
	}
}