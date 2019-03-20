import React, { Component } from 'react';

import SearchBox from './SearchBox.js';
import SearchResults from './SearchResults.js';

class Search extends Component{
	render(){
		const searchbox = this.props.searchbox;
		return(
			<div>
				<SearchBox
					handleClickOutside={this.props.handleClickOutside}
					searchValue={this.props.searchValue}
					searchVisible={this.props.searchVisible}
					handleChange={this.props.handleSearch}
					handleFocus={this.props.handleSearchFocus}
					handleBlur={this.props.handleSearchBlur}
				/>
				<SearchResults ref={searchbox}  showSearchResults={this.props.showSearchResults} searchResultsList={this.props.searchResultsList} />
			</div>
		);
	}
}
export default Search;