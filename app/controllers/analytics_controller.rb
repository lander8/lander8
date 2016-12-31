class AnalyticsController < ApplicationController
	before_action :authenticate_user!

	def dashboard
		render 'index'
	end
end
