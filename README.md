# jasonbutz.info dynamic helper

## Enviroment Variables

- `CONTACT_TO`
	E-mail address e-mails are sent to
- `CONTACT_FROM`
	E-mail address e-mails are sent from
- `AKISMET_KEY`
	Akismet API Key
- `AKISMET_URL`
	URL to send to Akismet API
- `CONTACT_REDIRECT_URL`
	URL to redirect users to when making non-JSON contact submissions. When in the development or test enviroment it will default to google.

## Functions

### Contact Me Form

Parameters can be sent, via POST request, in JSON format or as a form submission. Parameters sent as well as IP address, user agent, and referrer will be run through Akismet to check for spam. If no spam is found and the message appears "valid" an e-mail will be sent. When POSTing as a form submission there will be a redirect and either `errors` or `info` will be added as a query parameter based upon success or failure. When POSTing JSON the message object that is created is returned. If there is an error when POSTing JSON an `errors` key will be included that will have a message or messages.

**Parameters:**

- `message[author]`
	Name of person submitting the form
- `message[author_email]`
	E-mail address of person submitting the form
- `message[content]`
	E-mail message

**Successful Responses**

*HTML*

    Location: http://www.google.com?info=E-Mail%20sent
    Status: 302

*JSON*

    Status: 200
    {
        "author": "Bob",
        "author_email": "bob@example.com",
        "content": "This is a test",
        "user_ip": "127.0.0.1",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36",
        "referrer": null,
        "validation_context": null,
        "errors": {},
        "akismet_response": "false",
        "_spam": false
    }