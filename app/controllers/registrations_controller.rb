class RegistrationsController < Devise::RegistrationsController

	def after_sign_up_path_for(resource)
	  '/dashboard'
	end

	def create
		super

		# Sign user up for newsletter if they opted in
		if params[:user][:newsletter] == "on"
			HTTParty.post(
				"http://us14.api.mailchimp.com/3.0/lists/5bfe02e258/members", 
				body: {
					email_address: params[:user][:email], 
					status: "subscribed"
				}.to_json, 
				:basic_auth => { 
					:username => 'Lander8', 
					:password => ENV["MAILCHIMP_API_KEY"]
				}
			)
		end
	end

  private
	  def sign_up_params
	    params.require(:user).permit(:name, :email, :password, :password_confirmation)
	  end

	  def account_update_params
	    params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
	  end
end