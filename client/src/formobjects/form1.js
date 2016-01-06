var _ = require('underscore');

var NewStudentForm = function(data){
  this.data = data;
  this.errors = [];
}

NewStudentForm.prototype = _.extend(NewStudentForm.prototype, {
  process: function(){},
  isValid: function(){},
  persist: function(){}
});
