import {
	Route,
	NavLink,
	HashRouter
} from "react-router-dom";

import LogoIcon from './assets/icons/logo.js';
import HomeIcon from './assets/icons/home.js';
import AboutIcon from './assets/icons/about.js';
import PortfolioIcon from './assets/icons/portfolio.js';
import BlogIcon from './assets/icons/blog.js';
import ContactIcon from './assets/icons/contact.js';
import GithubIcon from './assets/icons/github.js';
import LinkedinIcon from './assets/icons/linkedin.js';

import Home from './content/Home.js';

import './App.scss';
import './Shooting-stars.scss';

const Header = () => {
	return (
		<header className="App-header">
			<div className="App-links">
				<NavLink className="App-logo" to="/"><LogoIcon /></NavLink>
				<a className="App-icon App-github" href="https://github.com/silvereh" target="_blank"><GithubIcon /></a>
				<a className="App-icon App-linkedin" href="https://www.linkedin.com/in/sheraudeau/" target="_blank"><LinkedinIcon /></a>
			</div>
			<nav className="App-nav">
				<NavLink className="App-icon App-home" to="/" exact><HomeIcon /></NavLink>
				<NavLink className="App-icon App-about" to="/"><AboutIcon /></NavLink>
				<NavLink className="App-icon App-portfolio" to="/"><PortfolioIcon /></NavLink>
				<NavLink className="App-icon App-blog" to="/"><BlogIcon /></NavLink>
				<NavLink className="App-icon App-contact" to="/"><ContactIcon /></NavLink>
			</nav>
		</header>
	);
}

const App = () => {
	return (
		<div className="App">
			<HashRouter>
				<Header />
				<div class="night hidden-xs">
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
				</div>
				<div class="night">
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
				</div>
				<div class="night">
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
				</div>
				<div class="night hidden-xs">
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
					<div class="shooting_star"></div>
				</div>
				<main class="App-content">
					<Route exact path="/" component={ Home } />
				</main>
			</HashRouter>
		</div>
	);
}

export default App;
