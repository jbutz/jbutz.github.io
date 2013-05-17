Handlebars.registerHelper('dateFormat', function(context, block) {
	var d = new Date( context );
    return d.toLocaleString();
});