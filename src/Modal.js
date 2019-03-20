import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

class Modal extends Component {
	componentDidMount(){
		document.addEventListener('click', this.props.onClickOutside, false);
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.props.onClickOutside, false);
	}
	render(){
		const closeModal = this.props.closeModal;
		const modalOpen = this.props.modalOpen;
		const info = this.props.info;
		let classList = ["modal"];
		return (
			<div
				className={classList.join(' ')}>
				<ReactMarkdown source={info} />
			</div>

		);
	}
}

export default Modal;