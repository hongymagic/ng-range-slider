angular
.module('ng-range-slider')
.directive('range-slider', function ()  {

	var html = [
	'<div class="ng-range-slider">',
	'	<div class="ng-range-slider-handle"></div>',
	'	<div class="ng-range-slider-active-segment"></div>',
	'	<input type="hidden" />',
	'</div>'
	].join('\n');

	// full render function, heaviest of all render functions
	function reflow($slider, value) {
		var $handle = $slider.data('handle');
		var $active = $slider.data('active');
		var options = $slider.data('options');

		// find out dimensions of the view elements
		//
		// ********[ ]========
		// ^       ^ ^       ^
		// |       |_|       |
		// |        |        |
		// |      handle     |
		// |------slider-----|

		var slider_width = $slider.outerWidth();
		var handle_width = $handle.outerWidth();

		var active_percentage = value / (options.max - options.min);
		var handle_position_x = (active_percentage * slider_width) - (handle_width / 2);

		// render handle and active segment
		$handle.css('transform', 'translateX(' + handle_position_x + 'px)');
		$active.css('width', handle_position_x + 'px');
	}

	return {
		restrict: 'E',
		required: '^ngModel',
		template: html,
		priority: 1,
		scope: {
			ngModel: '='
		},
		compile: function (element, attrs) {
			var $element = $(element);
			var $handle = $element.find('.ng-range-slider-handle');
			var $active = $element.find('.ng-range-slider-active-segment');

			$element.data('handle', $handle);
			$element.data('active', $active);
			$element.data('options', {
				min: attrs.min,
				max: attrs.max,
				step: attrs.step
			});

			// link function
			return function (scope, element, attrs) {
				// initial draw
				reflow($element, scope.ngModel);

				// ui => { ui, model }
				$element.on('click', $handle, function (event) {
				});

				// model => ui
				scope.$watch('ngModel', function (value) {
					reflow($element, value);
				});
			};
		}
	};
});