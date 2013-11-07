(function()
{
	$('#contactForm input[type="submit"]').click(function() // Validation
	{
		var status = true;
		// Remove existing messages
		$('#contactForm small.error').remove();
		$('div.contactAlerts').empty();
		$('#contactForm .error').removeClass('error');

		var $name    = $('#contactForm input[name="name"]');
		var $email   = $('#contactForm input[name="email"]');
		var $message = $('#contactForm textarea[name="message"]');

		// Validate fields
		if($name.val().trim() == "")
		{
			status = false;
			$name.prev('label').addClass('error');
			$name.addClass('error');
			$name.after('<small class="error">This field is required.</small>')
		}

		if($email.val().trim() == "")
		{
			status = false;
			$email.prev('label').addClass('error');
			$email.addClass('error');
			$email.after('<small class="error">This field is required.</small>')
		}

		if($message.val().trim() == "")
		{
			status = false;
			$message.prev('label').addClass('error');
			$message.addClass('error');
			$message.after('<small class="error">This field is required.</small>')
		}

		if(!status)
			return false;

		// Hide the button, show the spinner
		$('#contactForm input[type="submit"]').hide();
		$('#contactForm img.loadSpinner').show();
		// Send the AJAX
		$.ajax({  
			type: "POST",  
			url: "/contact.php",
			dataType: 'json',
			data: {
				'name': $name.val(),
				'email': $email.val(),
				'message': $message.val(),
				'recaptcha_challenge_field': $('#contactForm input[name="recaptcha_challenge_field"]').val(),
				'recaptcha_response_field': $('#contactForm input[name="recaptcha_response_field"]').val()
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown)
		{
			console.log("Fail",textStatus);
			$('div.contactAlerts').append('<div class="alert-box alert">Error: '+errorThrown+'</div>');
		})
		.done(function(data, textStatus, jqXHR)
		{
			if(data.error)
			{
				$('div.contactAlerts').append('<div class="alert-box alert">Error: '+data.error+'</div>');
			}
			if(data.success)
			{
				$('div.contactAlerts').append('<div class="alert-box success">'+data.success+'</div>');

				$('#contactForm input[type!="submit"], #contactForm textarea').val("");
				$('#recaptcha_reload_btn,#recaptcha_reload').click();
			}
		})
		.always(function()
		{
			$('#contactForm input[type="submit"]').show();
			$('#contactForm img.loadSpinner').hide();
		});
		return false;
	});
}())