Rails.application.routes.draw do

  devise_for :users, :path => '', :path_names => {:sign_in => 'login', :sign_out => 'logout', :sign_up => 'register'}, :controllers => { registrations: 'registrations' }
  
  devise_scope :user do
	  get "/login" => "devise/sessions#new"
	end

	get '/' => 'landing#index'

	# API ROUTES
	post '/tracking/:site_id/order' => 'api#order_track'

	# EMAIL ROUTES
	post '/newsletter' => 'email#newsletter'

	# INTERNAL ROUTES
	get '/dashboard' => 'analytics#dashboard'

end
