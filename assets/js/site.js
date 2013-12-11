(function() {
  $('form#contactForm').submit(function(e) {
    var $author, $author_email, $content, status;
    if ($('#contactForm input[name="try_ajax"]').val() !== "true") {
      return true;
    }
    e.stopPropagation();
    status = true;
    $('#contactForm small.error').remove();
    $('div.contactAlerts').empty();
    $('#contactForm .error').removeClass('error');
    $author = $('#contactForm input[name="message[author]"]');
    $author_email = $('#contactForm input[name="message[author_email]"]');
    $content = $('#contactForm textarea[name="message[content]"]');
    if ($author.val().trim() === "") {
      status = false;
      $author.prev('label').addClass('error');
      $author.addClass('error');
      $author.after('<small class="error">This field is required.</small>');
    }
    if ($author_email.val().trim() === "") {
      status = false;
      $author_email.prev('label').addClass('error');
      $author_email.addClass('error');
      $author_email.after('<small class="error">This field is required.</small>');
    }
    if ($content.val().trim() === "") {
      status = false;
      $content.prev('label').addClass('error');
      $content.addClass('error');
      $content.after('<small class="error">This field is required.</small>');
    }
    if (!status) {
      return false;
    }
    $('#contactForm input[type="submit"]').hide();
    $('#contactForm img.loadSpinner').show();
    $.ajax({
      type: "POST",
      url: "https://jasonbutzinfo.herokuapp.com/messages.json",
      cache: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        message: {
          author: $author.val(),
          author_email: $author_email.val(),
          content: $content.val()
        }
      })
    }).fail(function(jqXHR, textStatus, errorThrown) {
      return $('div.contactAlerts').append('<div class="alert-box alert">Error: ' + jqXHR.responseJSON.errors + '</div>');
    }).done(function(data, textStatus, jqXHR) {
      debugger;
      if (data.errors) {
        return $('div.contactAlerts').append('<div class="alert-box alert">Error: ' + data.errors + '</div>');
      } else {
        $('div.contactAlerts').append('<div class="alert-box success">' + data.success + '</div>');
        return $('#contactForm input[type!="submit"], #contactForm textarea').val("");
      }
    }).always(function() {
      $('#contactForm input[type="submit"]').show();
      return $('#contactForm img.loadSpinner').hide();
    });
    setTimeout(function() {
      if ($('div.contactAlerts div').length === 0) {
        $('div.contactAlerts').append('<div class="alert-box info">It looks like you may not be able to use some of the nifty things I have done on this site. Please click Submit again, this time a different method will be used to send your message.</div>');
        return $('#contactForm input[name="try_ajax"]').val('false');
      }
    }, 10000);
    return false;
  });

  $(document).ready(function() {
    var params;
    params = $.parseParams(window.location.search);
    if ((params.info != null) && params.info !== "") {
      $('#mainContent div:first').prepend("<div class='alert-box'>" + params.info + "</div>");
    }
    if ((params.errors != null) && params.errors !== "") {
      return $('#mainContent div:first').prepend("<div class='alert-box alert'>" + params.errors + "</div>");
    }
  });

}).call(this);
