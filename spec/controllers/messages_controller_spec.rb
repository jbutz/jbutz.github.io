require 'spec_helper'

describe MessagesController do

  let(:valid_attributes) { { author: "Tom Smith", author_email: "tom.smith@example.com", content: "Please contact me about a job offer. My number is 000-000-0000." } }

  let(:valid_session) { {} }

  describe "POST create" do
    describe "with valid params" do

      context 'with HTML' do
        it "assigns a newly created message as @message" do
          post :create, {:message => valid_attributes}, valid_session
          assigns(:message).should be_a(Message)
        end

        it "redirects you" do
          post :create, {:message => valid_attributes}, valid_session
          response.should be_redirect
        end

        it 'catches spam' do
          post :create, {:message => valid_attributes.merge(author: 'viagra-test-123')}, valid_session

          response.headers['Location'].should include('?errors=')
          response.headers['Location'].should include('spam')
          response.should be_redirect
        end
      end

      context 'with JSON' do
        it "assigns a newly created message as @message" do
          post :create, {:format => 'json', :message => valid_attributes}, valid_session
          assigns(:message).should be_a(Message)
        end

        it "succeeds" do
          post :create, {:format => 'json', :message => valid_attributes}, valid_session

          response.should_not be_redirect
          response.should be_ok
        end

        it "catches spam" do
          # Trigger the behavior that occurs when invalid params are submitted
          post :create, {:format => 'json', :message => valid_attributes.merge(author: 'viagra-test-123')}, valid_session

          response.should_not be_redirect
          response.status.should eq(422)
          response.body.should include('spam')
        end
      end

    end

    describe "with invalid params" do
      context 'with HTML' do
        it "redirects and has an error" do
          # Trigger the behavior that occurs when invalid params are submitted
          post :create, {:message => { "author" => nil }}, valid_session

          response.headers['Location'].should include('?errors=')
          response.should be_redirect
        end
      end

      context 'with JSON' do
        it "returns an error" do
          # Trigger the behavior that occurs when invalid params are submitted
          post :create, {:format => 'json', :message => { "author" => nil }}, valid_session

          response.should_not be_redirect
          response.status.should eq(422)
        end
      end
    end
  end

end
