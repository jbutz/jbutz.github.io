
JasonbutzInfo::Application.config.middleware.insert 0, Rack::Cors, :debug => true, :logger => Rails.logger do
    allow do
        origins '*'
        resource '/messages.json', :headers => :any, :methods => [:post, :options]
    end
end

module Rack
  class Cors
  	alias_method :call_original, :call
  	def call(env)
  		puts "Calling Rack::Cors"
  		call_original env
  	end

  	alias_method :initialize_original, :initialize
  	def initialize(app, opts={}, &block)
  		puts "Initing Rack::Cors"
  		initialize_original app, opts, &block
  	end

  	alias_method :allow_original, :allow
  	def allow(&block)
  		puts "Allow Block in Rack::Cors"
  		allow_original &block
  	end
  end
end