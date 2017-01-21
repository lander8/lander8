class WebsiteController < ApplicationController
	before_action :authenticate_user!

	def new
		render 'new', layout: 'landing'
	end

	def create
		Website.create(
			name: params[:name],
			url: params[:url],
			user_id: current_user.id,
			api_key: "lndr8_#{SecureRandom.urlsafe_base64}"
		)

		redirect_to '/websites'
	end

	def show
		@website = Website.find(params[:id])

		@integrations = Integration.all

		render 'show', layout: 'landing'
	end
end
