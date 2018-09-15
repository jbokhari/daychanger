import React from 'react';

export default class Card extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		const header = "";
		const content = "";
		const footer = "";
		return (
			<div className="card card-{cardNumber}">
				<header className="header">
					Card #{this.props.cardNumber}
				</header>
				<div className="main">
					{this.props.content}
				</div>			
				<footer>
					<button onClick={this.props.onClickNextCard}>New Card</button>
				</footer>
			</div>
		);
	}
}