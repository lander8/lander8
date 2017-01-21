class UserController < ApplicationController
	before_action :authenticate_user!

	def settings
		render 'settings', layout: 'landing'
	end

	def websites
		render 'websites', layout: 'landing'
	end

	# Which website is the user currently acting as?
	def select_website
		render 'select_website', layout: false
	end

	# Set the session variable for current website
	def set_selected_website
		session[:current_website] = params[:id]

		redirect_to '/dashboard'
	end
end
