# encoding: utf-8
# This file originally created at http://rove.io/51f08849146b24f9e105cd7a8fc90c56

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "opscode-ubuntu-12.04_chef-11.4.0"
  config.vm.box_url = "https://opscode-vm-bento.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_chef-11.4.0.box"
  config.ssh.forward_agent = true

  #config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.network :forwarded_port, guest: 4000, host: 4000

  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe :apt
    chef.add_recipe 'git'
    chef.add_recipe 'ruby_build'
    chef.add_recipe 'rbenv::user'
    chef.add_recipe 'nodejs'
    chef.json = {
      :git   => {
        :prefix => "/usr/local"
      },
      :rbenv => {
        :user_installs => [
          {
            :user   => "vagrant",
            :rubies => [
              "2.0.0-p353"
            ],
            :global => "2.0.0-p353"
          }
        ],
        :gems => {
          "2.0.0-p353" => [
            { 'name'    => 'bundler' },
            { 'name'    => 'jekyll' }
          ]
        }
      }
    }
  end
end
