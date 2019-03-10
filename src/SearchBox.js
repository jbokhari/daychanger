import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch)

export default function SearchBox(props) {
	return (
		<span><span className="search-icon">
			<FontAwesomeIcon icon="search" /></span> <input type="text" value={props.searchValue} className="search-box" onFocus={props.handleFocus} onBlur={props.handleBlur} onChange={props.handleChange} /></span>
	);
}