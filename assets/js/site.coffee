---
---
$('form#contactForm').submit (e)->
	# Check if we are even supposed to attempt ajax
	if $('#contactForm input[name="try_ajax"]').val() != "true"
		return true
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
		url: "https://jasonbutzinfo.herokuapp.com/messages.json"
		cache: false
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: JSON.stringify
			message:
				author: $author.val()
				author_email: $author_email.val()
				content: $content.val()

	.fail (jqXHR, textStatus, errorThrown)->
		$('div.contactAlerts').append('<div class="alert-box alert">Error: '+jqXHR.responseJSON.errors+'</div>')

	.done (data, textStatus, jqXHR)->
		debugger
		if data.errors
			$('div.contactAlerts').append('<div class="alert-box alert">Error: '+data.errors+'</div>')
		else
			$('div.contactAlerts').append('<div class="alert-box success">'+data.success+'</div>')
			$('#contactForm input[type!="submit"], #contactForm textarea').val("")
	
	.always ->
		$('#contactForm input[type="submit"]').show()
		$('#contactForm img.loadSpinner').hide()

	setTimeout ()->
		if $('div.contactAlerts div').length == 0
			$('div.contactAlerts').append('<div class="alert-box info">It looks like you may not be able to use some of the nifty things I have done on this site. Please click Submit again, this time a different method will be used to send your message.</div>')
			$('#contactForm input[name="try_ajax"]').val('false')
	, 10000
	return false

$(document).ready ->
	params = $.parseParams(window.location.search)
	$('#mainContent div:first').prepend "<div class='alert-box'>#{params.info}</div>" if params.info? && params.info != ""
	$('#mainContent div:first').prepend "<div class='alert-box alert'>#{params.errors}</div>" if params.errors? && params.errors != ""