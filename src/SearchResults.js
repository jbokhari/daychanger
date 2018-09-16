import React from 'react';

export default function SearchResults(props) {

	let classList = [
		"search-results"
	];

	if (props.showSearchResults)
		classList = classList.concat("visible");

	return (
		<div className={classList.join(" ")}>
			<ul className="search-result-list">
				{props.searchResultsList}
			</ul>
		</div>
	);
}