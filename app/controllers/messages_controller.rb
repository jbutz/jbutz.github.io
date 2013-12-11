class MessagesController < ApplicationController

  protect_from_forgery :except => :create

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(message_params)
    @message.user_ip = request.remote_ip
    @message.user_agent = request.user_agent
    @message.referrer = request.referrer

    respond_to do |format|
      if !@message.valid? # Validation
        format.html { redirect_to generate_url(Rails.application.config.contact_redirect_url, errors: @message.errors.full_messages.to_sentence) }
        format.json { render json: {errors: @message.errors.full_messages.to_sentence}, status: :unprocessable_entity }
      elsif @message.spam? # Spam
        format.html { redirect_to generate_url(Rails.application.config.contact_redirect_url, errors: "Your message appears to be spam.") }
        format.json { render json: {errors: "Your message appears to be spam."}, status: :unprocessable_entity }
      else # Valid

        EmailMessages.contact(@message).deliver

        format.html { redirect_to generate_url(Rails.application.config.contact_redirect_url, info: "Your message has been sent.") }
        #format.json { render nothing: true }
        format.json { render json: {success: "Your message has been sent.", message: @message} }
      end
    end
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def message_params
      params.require(:message).permit(:author, :author_email, :content)
    end

    def generate_url(url, params = {})
      uri = URI(url)
      uri.query = params.to_query
      uri.to_s
    end
end
