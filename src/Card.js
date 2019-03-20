import React from 'react';

import ReactMarkdown from 'react-markdown';



export default class Card extends React.Component {
	handleSearch(){

	}
	render(){
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
				<div className={mainSectionClasses.join(" ")}>
					<div className="overlay"></div>
					<ReactMarkdown source={this.props.content} />
				</div>			
				
			</div>
		);
	}
}