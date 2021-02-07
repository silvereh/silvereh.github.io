import React from 'react';
import Parser from 'rss-parser';

import './Portfolio.scss';

const feedUrl = '/portfolio/feed-en.rss';
const proxy = 'https://silvereh.github.io'
const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric'
}

export class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		};
		(async () => {
			try {
				let parser = new Parser();
				let feed = await parser.parseURL(proxy + feedUrl);
				console.log(feed);
				this.setState({ items: feed.items });
			}
			catch (error) {
				console.log (error);
			}
		})();
	}

	render() {
		let articleCount = 0;
		return (
			<section className="Portfolio" id="portfolio">
				<div className="Portfolio-content">
					<h2>My Projects</h2>
					<div id="Portfolio-articles">
						{
							this.state.items.map(item => {
								let desc = item.contentSnippet.split('|')
								console.log(item);
								return (
									<a className="Portfolio-article" href={item.link}>
										<h3 className="Portfolio-article-title">{item.title}</h3>
										<p className="Portfolio-article-tech">{desc[1]}</p>
										<img className="Portfolio-article-thumb img-responsive" src={desc[0]} />
										<p className="Portfolio-article-summary">{desc[2]}</p>
									</a>
								);
							})
						}
					</div>
				</div>
			</section>
		);
	}
}
