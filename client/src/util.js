(function(){

	var sBASE = function(){
		var config;
		var CO = {
			init: function(){

				// var selNodes = this.getTagByName(document.body, 'span');
				Document.prototype.getTagByNameShim = CO.getTagByName;
			},
			getTagByName: function(tar, sel){
				var arr = arguments[2] || [];

				//Valid tag and collect nodes in arr
				if(tar
					&& tar.tagName
					&& tar.tagName.toLowerCase() === sel.toLowerCase()
				){
					arr.push(tar);
				}

				if(tar.hasChildNodes()){
					CO.getTagByName(tar.firstChild, sel, arr);
				}

				if(tar.nextSibling){
					CO.getTagByName(tar.nextSibling, sel, arr);
				}
				return arr;
			}
		};

		return {
			'CO': CO
		};
	}();

	sBASE.CO.init();
})();