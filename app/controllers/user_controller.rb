class UserController < ApplicationController
	before_action :authenticate_user!

	def settings
		render 'settings', layout: 'landing'
	end

	def websites
		render 'websites', layout: 'landing'
	end

	def new_website
		render 'new_website', layout: 'landing'
	end

	def create_website
		Website.create(
			name: params[:name],
			url: params[:url],
			user_id: current_user.id,
			api_key: "lndr8_#{SecureRandom.urlsafe_base64}"
		)

		redirect_to '/websites'
	end
end
