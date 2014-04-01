(function (angular) {
	var module = angular.module('ng-range-slider', ['ng']);

	function Slider($root, options, value) {
		this.$slider = $root;
		this.$handle = $root.find('.range-slider-handle');
		this.$active = $root.find('.range-slider-active-segment');

		this.min = parseFloat(options.min);
		this.max = parseFloat(options.max);
		this.step = parseFloat(options.step);
		this.value = parseFloat(value);
		this.__debug = options.debug === true || options.debug === 'true';

		this.bind();
		this.render();
	}

	Slider.prototype = {
		render: function () {
			var percentage = this.value / (this.max - this.min);
			var active_width = percentage * this.$slider.outerWidth();

			this.debug(this.value, this.min, this.max, active_width, this.$slider.outerWidth());

			this.$handle.css('transform', 'translateX(' + active_width + 'px)');
			this.$active.css('width', active_width + 'px');
		},

		bind: function () {
			this
			.$slider
			.off('.slider')
			.on(
				'mousedown.slider touchstart.slider pointerdown.slider',
				'.range-slider-handle',
				function (event) {
					if (!this.active) {
						event.preventDefault();
						this.active = true;
					}
				}.bind(this)
			)
			.on(
				'mousemove.slider touchmove.slider pointerdown.slider',
				function (event) {
					if (!!this.active) {
						event.preventDefault();
						this.calculate(event.pageX || event.originalEvent.touches[0].clientX || event.currentPoint.x);
					}
				}.bind(this)
			)
			.on(
				'mouseup.slider touchend.slider pointerup.slider',
				function (event) {
					this.active = false;
				}.bind(this)
			)
			.on(
				'change.slider',
				function (event) {
					this.emit('change');
				}.bind(this)
			);
		},

		calculate: function (x) {
			this.debug('x =', x);

			window.requestAnimationFrame(function () {
				var percentage = x / this.$slider.outerWidth();
				this.value = this.normalised(percentage, this.min, this.max, this.step);

				this.debug(percentage, this.value);
				this.render();
			}.bind(this));
		},

		normalised: function (percentage, start, end, step) {
			var range = end - start;
			var point = percentage * range;
			var mod = (point - (point % step)) / step;
			var rem = point % step;
			var round = (rem >= step * 0.5 ? step : 0);
			return (mod * step + round) + start;
		},

		debug: function () {
			if (this.__debug === true) {
				console.debug.apply(console, arguments);
			}
		}
	};

	module
	.directive('rangeSlider', function ()  {
		var html = [
			'<div class="range-slider">',
			'	<span class="range-slider-handle"></span>',
			'	<span class="range-slider-active-segment"></span>',
			'	<input type="hidden" />',
			'</div>'
		].join('\n');

		return {
			restrict: 'E',
			required: '^ngModel',
			template: html,
			priority: 1,
			scope: {
				ngModel: '='
			},
			compile: function (element, attrs) {

				// link function
				return function (scope, element, attrs) {
					return new Slider($(element).find('.range-slider'), attrs, scope.ngModel);
					/*
					// initial draw
					//reflow($element, scope.ngModel);

					// ui => { ui, model }
					$element.on('click', $handle, function (event) {
					});

					// model => ui
					scope.$watch('ngModel', function (value) {
						//reflow($element, value);
					});
					*/
				};
			}
		};
	});
}(angular));
