---
layout: post.html
title: "Etsy Deployinator Environments"
date: 2013-07-31
tags: Deployinator, Ruby
---
Etsy open-sourced their deployment tool a while back, but I didn't learn about it until more recently. It is called [Deployinator](https://github.com/etsy/deployinator) and runs on Ruby. I'm looking at using it for a project at work, but I ran into a horrible lack of documentation. The one example that is in the repo isn't bad, it just doesn't show you how to have multiple deploy buttons. In the case I may use it in, I will need multiple. If you aren't sure what I mean by "multiple deploy buttons" check out the picture on [this page](http://codeascraft.com/2010/05/20/quantum-of-deployment/).

After digging through the code I finally got that working and I think others might want to avoid digging through the code.

If you don't configure the buttons, called environments, then you get one "Deploy production" button, like you see below.

<p><a href="/img/posts/etsy-deployinator-00.png" class="th radius" style="display: inline-block;">
	<img src="/img/posts/etsy-deployinator-00.png" alt="Deployinator default enviroment" />
</a></p>

Below is what you get for the demo stack. Only a few of the methods are actually required for the default setup. The required methods for the default setup are `demo_production`, `demo_production_version`, and `demo_head_build`.

```ruby
module Deployinator
  module Stacks
    module Demo
      def demo_git_repo_url
        "git://github.com/etsy/statsd.git"
      end

      def demo_git_checkout_path
        "#{checkout_root}/#{stack}"
      end

      def checkout_root
        "/tmp"
      end

      def demo_production_version
        %x{cat #{demo_git_checkout_path}/version.txt}
      end

      def demo_production_build
        Version.get_build(demo_production_version)
      end

      def demo_head_build
        %x{git ls-remote #{demo_git_repo_url} HEAD | cut -c1-7}.chomp
      end

      def demo_production(options={})
        old_build = Version.get_build(demo_production_version)

        git_cmd = old_build ? :git_freshen_clone : :github_clone
        send(git_cmd, stack, "sh -c")

        git_bump_version stack, ""

        build = demo_head_build

        begin
          run_cmd %Q{echo "ssh host do_something"}
          log_and_stream "Done!<br>"
        rescue
          log_and_stream "Failed!<br>"
        end

        # log this deploy / timing
        log_and_shout(:old_build => old_build, :build => build, :send_email => true)
      end
    end
  end
end
```

The code that sets up the environments is in `helpers.rb`. The environments are defined by an array of hashes, this is what the code for the default environment looks like:

```ruby
[{
  :name            => "production",
  :title           => "Deploy #{stack} production",
  :method          => "#{stack}_production",
  :current_version => proc{send(:"#{stack}_production_version")},
  :current_build   => proc{Version.get_build(send(:"#{stack}_production_version"))},
  :next_build      => proc{send(:head_build)}
}]
```

Once I found this code, and found the typo in my method name I was easily able to add more environments. To add environments to the demo stack that is provided all you have to do is define a `demo_environments` method in the stack file. Below is an example with a qa and production environment defined in a dynamic way.

```ruby
def demo_environment
  [{
    :name            => "qa",
    :title           => "Deploy #{stack} qa",
    :method          => "#{stack}_qa",
    :current_version => proc{send(:"#{stack}_qa_version")},
    :current_build   => proc{Version.get_build(send(:"#{stack}_qa_version"))},
    :next_build      => proc{send(:head_build)}
  },
  {
    :name            => "production",
    :title           => "Deploy #{stack} production",
    :method          => "#{stack}_production",
    :current_version => proc{send(:"#{stack}_production_version")},
    :current_build   => proc{Version.get_build(send(:"#{stack}_production_version"))},
    :next_build      => proc{send(:head_build)}
  }]
end
```

After adding this environment you will need to add a few additional methods ( `demo_qa` and `demo_qa_version` ). If you wanted you could also define the environments like so:

```ruby
def demo_environment
  [{
    :name            => "qa",
    :title           => "Deploy demo qa",
    :method          => "demo_qa",
    :current_version => proc{send(:demo_qa_version)},
    :current_build   => proc{Version.get_build(send(:demo_qa_version))},
    :next_build      => proc{send(:head_build)}
  },
  {
    :name            => "production",
    :title           => "Deploy demo production",
    :method          => "demo_production",
    :current_version => proc{send(:demo_production_version)},
    :current_build   => proc{Version.get_build(send(:demo_production_version))},
    :next_build      => proc{send(:head_build)}
  }]
end
```

Here is what you end up with.

<p><a href="/img/posts/etsy-deployinator-01.png" class="th radius" style="display: inline-block;">
	<img src="/img/posts/etsy-deployinator-01.png" alt="Deployinator default enviroment" />
</a></p>

So far this has been the biggest thing that wasn't explained. Anything else I come across I'll add here as well.