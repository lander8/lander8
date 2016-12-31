class ApiController < ApplicationController
	skip_before_action :verify_authenticity_token
	before_action :verify_api_key

	def order_track
		puts params
	end

	def verify_api_key
		# Add check to tie API key with account
	end
end
