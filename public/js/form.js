$.validator.setDefaults({
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
})

$("#project-form").validate(
  {rules: {
    start: {required: true, date: true},
    end: {required: true, date: true},
    daysinrow: {min: 1},

  },
   messages: {
    coordinates: {required: 'Please draw the location on the map.'}
   } 
});

$('#dates input').datepicker({
});