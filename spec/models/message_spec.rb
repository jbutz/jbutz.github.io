require 'spec_helper'

describe Message do
  let(:message) { Message.new(:author => "Tom Smith", :author_email => "tom.smith@example.com", :content => "Please contact me about a job offer. My number is 000-000-0000." ) }

  it "has an author attribute" do
  	message.should respond_to('author')
  end

  it "has an author_email attribute" do
  	message.should respond_to('author_email')
  end

  it "has an content attribute" do
  	message.should respond_to('content')
  end

  it "requires an author" do
    message.author = nil
    expect( message.valid? ).to be_false
  end

  it "requires an author_email" do
    message.author_email = nil
    expect( message.valid? ).to be_false
  end

  it "requires an content" do
    message.content = nil
    expect( message.valid? ).to be_false
  end
end
