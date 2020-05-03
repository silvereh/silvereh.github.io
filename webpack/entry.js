import './lib.js';
import './styles/main.scss';

// var SELECTOR = {
// 	DATATRIGGER  : {
// 		PARENT       : '[data-trigger=parent]'
// 	},
// 	NAV          : '[data-target=nav]'
// }
function toggleMenu(trigger, target) {
	console.log('target: ' + target);
	target.toggleClass('hidden-xs');
	target.toggleClass('hidden-sm');
	trigger.toggleAttributeValue('aria-expanded');
}

function handleClick(event) {
	var trigger = event.target;
	console.log('trigger: ' + trigger);
	var triggerEnabled = trigger.isEnabled();
	if (triggerEnabled) {
		while (trigger.matches('[data-trigger]')) {
			var newTrig = trigger.getAttribute('data-trigger');
			if (newTrig == "parent") {
				trigger = trigger.parentNode;
			}
			console.log('new trigger: ' + trigger);
		}
		while (trigger.matches('[data-target]')) {
			event.preventDefault();
			var targetId = trigger.getAttribute('data-target');
			if (targetId == "nav") {
				var target = document.getElementById(targetId);
				toggleMenu(trigger, target);
				break;
			}
		}
	}
}

document.addEventListener('click', handleClick);
