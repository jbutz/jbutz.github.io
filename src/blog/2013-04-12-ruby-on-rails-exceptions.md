---
layout: post.html
title: "Ruby on Rails Exceptions"
date: 2013-04-12
tags: Development, Ruby on Rails
---
I've been learning Ruby and Ruby on Rails recently, and I was working on an application today that gave me some trouble in one particular area. The application is a simple application to allow IT to post the status of different systems so people can be aware of any issues. There are three models involved:

* Services
* Statuses
* Events

An event references both a service and a status. I needed to be able to ensure a status being deleted wasn't referenced by any events. The callback and the database query were easy, but I was having issues when it came to showing an error as to why the status wasn't deleted. After a bit of Googling I found that exceptions seems to be the best way to do this. That was good to know, but I still had to figure out how to use them for this case. I had trouble finding any good example of an exception being used, so I figure I ought to post what I came up with.

*status_controller.rb*

```ruby
class StatusesController < ApplicationController
...
  def destroy
    @status = Status.find(params[:id])
    begin
      @status.destroy
    rescue Exception => e
      flash[:error] = e.message
      redirect_to statuses_url
      return
    end

    respond_to do |format|
      format.html { redirect_to statuses_url }
      format.json { head :no_content }
    end
  end
end
```

*status.rb*

```ruby
class Status < ActiveRecord::Base
...
  before_destroy :check_existing_events

  private
...
  def check_existing_events
    raise Exception.new("Events exist that use that status.") unless Event.where(:status_id => self.id).count == 0
  end
end
```