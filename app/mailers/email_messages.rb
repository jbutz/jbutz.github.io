class EmailMessages < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.email_messages.contact.subject
  #
  def contact(message)
    @message = message

    mail to: ENV['CONTACT_TO'], from: ENV['CONTACT_FROM'], subject: 'Website Contact', reply_to: @message.author_email
  end
end
