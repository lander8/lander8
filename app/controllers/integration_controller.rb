class IntegrationController < ApplicationController

	def twitter_callback
		if current_website.twitter_account.nil?
			current_website.create_twitter_account(
				token: request.env['omniauth.auth']['credentials']['token'],
				secret: request.env['omniauth.auth']['credentials']['secret']
			)
		else
			current_website.twitter_account.update_attributes(
				token: request.env['omniauth.auth']['credentials']['token'],
				secret: request.env['omniauth.auth']['credentials']['secret']
			)
		end

		redirect_to "/websites/#{current_website.id}"
	end

	def delete
		current_website.send("#{params[:integration]}_account").delete

		redirect_to "/websites/#{current_website.id}"
	end

end

