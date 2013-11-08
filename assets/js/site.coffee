---
---
###
$('form#contactForm').submit (e)->
	console.log 'It is running...'
	e.stopPropagation()
	status = true
	# Remove existing messages
	$('#contactForm small.error').remove()
	$('div.contactAlerts').empty()
	$('#contactForm .error').removeClass('error')

	$author       = $('#contactForm input[name="message[author]"]')
	$author_email = $('#contactForm input[name="message[author_email]"]')
	$content      = $('#contactForm textarea[name="message[content]"]')

	# Validate fields
	if $author.val().trim() is ""
		status = false
		$author.prev('label').addClass('error')
		$author.addClass('error')
		$author.after('<small class="error">This field is required.</small>')

	if $author_email.val().trim() is ""
		status = false
		$author_email.prev('label').addClass('error')
		$author_email.addClass('error')
		$author_email.after('<small class="error">This field is required.</small>')

	if $content.val().trim() is ""
		status = false;
		$content.prev('label').addClass('error')
		$content.addClass('error')
		$content.after('<small class="error">This field is required.</small>')

	return false unless status

	# Hide the button, show the spinner
	$('#contactForm input[type="submit"]').hide()
	$('#contactForm img.loadSpinner').show()
	# Send the AJAX
	$.ajax
		type: "POST"
		#url: "http://127.0.0.1:3000/messages.json"
		url: "http://jasonbutzinfo.herokuapp.com/messages.json"
		cache: false
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify
			message:
				author: $author.val()
				author_email: $author_email.val()
				content: $content.val()

	.fail (jqXHR, textStatus, errorThrown)->
		$('div.contactAlerts').append('<div class="alert-box alert">Error: '+errorThrown+'</div>')

	.done (data, textStatus, jqXHR)->
		if data.error
			$('div.contactAlerts').append('<div class="alert-box alert">Error: '+data.error+'</div>')

		if data.success
			$('div.contactAlerts').append('<div class="alert-box success">'+data.success+'</div>')
			$('#contactForm input[type!="submit"], #contactForm textarea').val("")
			$('#recaptcha_reload_btn,#recaptcha_reload').click()
	.always ->
		$('#contactForm input[type="submit"]').show()
		$('#contactForm img.loadSpinner').hide()

	return false
###

$(document).ready ->
	params = $.parseParams(window.location.search)
	$('#mainContent div:first').prepend "<div class='alert-box'>#{params.info}</div>" if params.info? && params.info != ""
	$('#mainContent div:first').prepend "<div class='alert-box alert'>#{params.errors}</div>" if params.errors? && params.errors != ""