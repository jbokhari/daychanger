import React, { Component } from 'react';

import SearchBox from './SearchBox.js';
import SearchResults from './SearchResults.js';

class Search extends Component{
	render(){
		return(
			<section className="search">
				<SearchBox
					handleClickOutside={this.props.handleClickOutside}
					searchValue={this.props.searchValue}
					searchVisible={this.props.searchVisible}
					handleChange={this.props.handleSearch}
					handleFocus={this.props.handleSearchFocus}
					handleBlur={this.props.handleSearchBlur}
				/>
				<SearchResults showSearchResults={this.props.showSearchResults} searchResultsList={this.props.searchResultsList} />
			</section>
		);
	}
}
export default Search;