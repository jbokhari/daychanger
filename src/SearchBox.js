import React, { Component } from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

class SearchBox extends Component {
	constructor(props){
		super(props);
		// this.handleClick = this.handleClick.bind(this);
	}
	
	componentWillUnmount(){
		document.removeEventListener(
			'click',
			this.props.handleClickOutside,
			false
		);
	}
	componentWillMount(){
		document.addEventListener(
			'click',
			this.props.handleClickOutside,
			false
		);
	}
	render(){
		return (
			<span><span className="search-icon">
				<FontAwesomeIcon icon="search" /></span> <input type="text" value={this.props.searchValue} className="search-box" onFocus={this.props.handleFocus} onBlur={this.props.handleBlur} onChange={this.props.handleChange} />
			</span>
		);
	}
}
export default SearchBox;