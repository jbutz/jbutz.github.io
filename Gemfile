source 'https://rubygems.org'
ruby '2.0.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'


# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# Use LESS for stylesheets
gem "less-rails", "~> 2.4.2"
gem "therubyracer", "~> 0.12.0", platforms: :ruby

# Slim for templates
gem "slim-rails", "~> 2.0.1"

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

# make sure we didn't get spam
gem "rakismet", "~> 1.4.0"

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

group :development, :test do
	gem 'rb-fsevent', '~> 0.9.3', require: RUBY_PLATFORM =~ /darwin/i ? 'rb-fsevent' : false
	gem 'rb-inotify', '~> 0.9', require: RUBY_PLATFORM =~ /linux/i ? 'rb-inotify' : false
	gem 'terminal-notifier-guard', require: false

	gem 'guard'
	gem 'guard-rspec'
	gem 'rspec-rails'
	gem 'capybara'

	gem 'pry'
end

group :production do
	# E-Mail
	gem 'postmark-rails'

	# Web Server
	gem 'puma'
end

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]
