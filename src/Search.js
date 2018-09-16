import React from 'react';

import SearchBox from './SearchBox.js';
import SearchResults from './SearchResults.js';

export default function Search(props){
	return (
		<section className="search">
			<SearchBox searchValue={props.searchValue} handleChange={props.handleSearch} handleFocus={props.handleSearchFocus}/>
			<SearchResults showSearchResults={props.showSearchResults} searchResultsList={props.searchResultsList} />
		</section>
	);
}