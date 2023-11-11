//Global var
var CRUMINA = {};

(function ($) {

	// USE STRICT
	"use strict";

	//----------------------------------------------------/
	// Predefined Variables
	//----------------------------------------------------/
	var $window = $(window),
		$document = $(document),
		$body = $('body');

	/* -----------------------
	 * Spinner animation
	 * https://codepen.io/funxer/pen/Zvjebx
	 * --------------------- */

	CRUMINA.spinnerAnimation = function () {
		var canvas = document.getElementById("can");
		var ctx = canvas.getContext("2d");
		var points = [];
		var fov = 100;
		var dist = 100;
		var opacity = 1;
		var particleSize = 1.5;
		var maxAmplitude = 1500; // Best results with values > 500
		var sideLength = 50; // How many particles per side
		var spacing = 200; // Particle distance from each other

		var rotXCounter = 0;
		var rotYCounter = 0;
		var rotZCounter = 0;
		var counter = 0;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		function Vector3(x, y, z) {
			this.x = x;
			this.y = y;
			this.z = z;
			this.color = "#0D0";
		}

		Vector3.prototype.rotateX = function (angle) {
			var z = this.z * Math.cos(angle) - this.x * Math.sin(angle);
			var x = this.z * Math.sin(angle) + this.x * Math.cos(angle);
			return new Vector3(x, this.y, z);
		};

		Vector3.prototype.rotateY = function (angle) {
			var y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
			var z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
			return new Vector3(this.x, y, z);
		};
		Vector3.prototype.rotateZ = function (angle) {
			var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
			var y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
			return new Vector3(x, y, this.z);
		};

		Vector3.prototype.perspectiveProjection = function (fov, viewDistance) {
			var factor = fov / (viewDistance + this.z);
			var x = this.x * factor + canvas.width / 2;
			var y = this.y * factor + canvas.height / 2;
			return new Vector3(x, y, this.z);
		};
		Vector3.prototype.draw = function () {
			var frac = this.y / maxAmplitude;
			var r = 255;
			var g = 186;
			var b = 0;
			var vec = this.rotateX(rotXCounter).rotateY(rotYCounter).rotateZ(rotZCounter).perspectiveProjection(fov, dist);

			this.color = "rgb(" + r + ", " + g + ", " + b;
			ctx.fillStyle = this.color;
			ctx.fillRect(vec.x, vec.y, particleSize, particleSize);
		};

// Init
		for (var z = 0; z < sideLength; z++) {
			for (var x = 0; x < sideLength; x++) {
				var xStart = -(sideLength * spacing) / 2;
				points.push(
					new Vector3(xStart + x * spacing, 0, xStart + z * spacing));

			}
		}

		(function loop() {
			ctx.fillStyle = "rgba(22, 24, 29, " + opacity + ")";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for (var i = 0, max = points.length; i < max; i++) {
				var _x = i % sideLength;
				var _z = Math.floor(i / sideLength);
				var xFinal = Math.sin(_x / sideLength * 4 * Math.PI + counter);
				var zFinal = Math.cos(_z / sideLength * 4 * Math.PI + counter);
				var gap = maxAmplitude * 0.3;
				var amp = maxAmplitude - gap;

				points[_z * sideLength + _x].y = maxAmplitude + xFinal * zFinal * amp;

				points[i].draw();
			}
			counter += 0.03;

			rotXCounter += 0.005;
			rotYCounter += 0.005;
			//rotZCounter += 0.005;

			window.requestAnimationFrame(loop);
		})();
	};


	/* -----------------------
	 * Flying Balls
	 * Author : Vincent Garreau  - vincentgarreau.com
	 * MIT license: http://opensource.org/licenses/MIT
	 * Demo / Generator : vincentgarreau.com/particles.js
	 * --------------------- */

	CRUMINA.flyingBalls = function () {

		setTimeout(function () {
			$('.particles-js').each(function () {
				var id = 'particle-' + (Math.floor(Math.random() * (999 - 111 + 1)) + 111);
				$(this).attr('id', id);
				particlesJS.load(id, './js/' + $(this).data('settings') + '.json', function () {
				});
			});
		}, 500);
	};


	

	$document.ready(function () {

       CRUMINA.flyingBalls();


		if ($('#can').length) {
			CRUMINA.spinnerAnimation();
		}

	});

})(jQuery);