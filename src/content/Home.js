import './Home.scss';
import './Shooting-stars.scss';

const Home = () => {
	return (
		<section className="Home" id="home">
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
			<div className="Home-content-wrap">
				<div className="Home-content">
					<p className="Home-text">Hello, I'm</p>
					<h1 className="Home-text Home-title">Silvere Heraudeau</h1>
					<p className="Home-text Home-job-title"><span className="sr-only">Web and Software Engineer</span></p>
				</div>
			</div>
		</section>
	);
}

export default Home;
