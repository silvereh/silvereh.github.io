/**
 * Summary. Extends the regular DOM elements methods for easier programming experience.
 *
 * @version 1.0.0.
 */

/**
 * Summary. Toggles on and off the specified attribute of the element with its value.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @param 	string 	name of the attribute to toggle.
 * @param 	string 	value of the attribute to toggle, defaults to 'true'.
 */
Element.prototype.toggleAttribute = function (attribute, value) {
	value === undefined ? true : value;
  if ( this.hasAttribute(attribute) ) { this.removeAttribute(attribute); }
  else { this.addAttribute(attribute, value); }
};

/**
 * Summary. Checks whether the element has the specified class.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @param 	string 	name of the class to check.
 * @return  boolean true if the element has the specified class.
 */
Element.prototype.hasClass = function (className) { return this.classList.contains(className); }

/**
 * Summary. Toggles on an off the specified class on the element.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @param 	string 	name of the class to toggle.
 */
Element.prototype.toggleClass = function (className) { this.classList.toggle(className); }

/**
 * Summary. Adds the specified class to the element.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @param 	string 	name of the class to add.
 */
Element.prototype.addClass = function (className) { if ( ! this.hasClass(className) ) { this.classList.add(className); } }

/**
 * Summary. Removes the specified class from the element.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @param 	string 	name of the class to remove.
 */
Element.prototype.removeClass = function (className) { this.classList.remove(className); }

/**
 * Summary. Checks whether the element is expanded.
 *
 * Description. This function first check if the element has the attribute 'aria-expanded'.
 *              If it does not, it returns false.
 *              If it does, it returns the value of this attribute.
 * @since   1.0.0.
 * @version 1.0.0.
 * @return  boolean true if the element has the specified class.
 */
Element.prototype.isExpanded = function () {
	if ( this === null ) { return false; }
	if ( ! this.hasAttribute("aria-expanded") ) { return false; }
	else { return this.getAttribute("aria-expanded") === "true" || false; }
}

/**
 * Summary. Shows the element by setting its display to 'block'.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 */
Element.prototype.show = function () { this.removeClass('hidden'); }

/**
 * Summary. Hides the element by setting its display to 'none'.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 */
Element.prototype.hide = function () { this.addClass('hidden'); }

/**
 * Summary. Toggles the visibility of the element.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 */
Element.prototype.toggle = function () { this.toggleClass('hidden'); }


/**
 * Summary. Checks if the Element is disabled or not.
 *
 * @since   1.0.0.
 * @version 1.0.0.
 * @return  boolean true if the element doesnt the attribute or class disabled.
 */
Element.prototype.isEnabled = function () {
	if ( this === null ) { return false; }
	return ( ! this.hasAttribute('disabled') ) || ( this.getAttribute('disabled') === 'false' ) || ( ! this.hasClass('disabled') );
}

Element.prototype.enable = function() { this.removeAttribute( 'disabled' ); }
Element.prototype.disable = function() { this.setAttribute( 'disabled', 'true' ); }
