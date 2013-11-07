require "spec_helper"

describe EmailMessages do
  describe "contact" do
    let(:mail) { EmailMessages.contact( Message.new(:author => "Tom Smith", :author_email => "tom.smith@example.com", :content => "Please contact me about a job offer. My number is 000-000-0000." ) ) }

    it "renders the headers" do
      mail.subject.should eq("Website Contact")
      mail.to.should include(ENV['CONTACT_TO'])
      mail.from.should include(ENV['CONTACT_FROM'])
    end

    it "renders the body" do
      mail.body.encoded.should include("Tom Smith")
    end
  end

end
