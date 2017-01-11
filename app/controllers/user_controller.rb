class UserController < ApplicationController
	before_action :authenticate_user!

	def settings
		render 'settings', layout: 'landing'
	end

	def websites
		render 'websites', layout: 'landing'
	end
end
