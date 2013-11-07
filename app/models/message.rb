class Message
	include ActiveModel::Model
	include Rakismet::Model

	attr_accessor :author, :author_email, :content, :user_ip, :user_agent, :referrer

	validates :author, presence: true
	validates :author_email, presence: true
	validates :content, presence: true

end
