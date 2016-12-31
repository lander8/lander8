class LandingController < ApplicationController

	def index
		render 'index', layout: 'landing'
	end
end
