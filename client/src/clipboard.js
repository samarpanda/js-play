(function(){
	var sBASE = function(){
		var config = {};
		var UI = {
			init: function(){},
			copyClipboard: function(){
				var button = document.getElementById('#copyButton');
				var tarText = document.getElementById('#copy');

				button.addEventListener('click', function(e){
					e.preventDefault();
					tarText.select();

					//This copies the selected text to the clipboard
					document.execCommand('copy');
				});
			}
		}

		return {
			'UI': UI
		};
	}();


})();