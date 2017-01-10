Rails.application.routes.draw do

  devise_for :users, 
  	:path => '', 
  	:path_names => {
  		:sign_in => 'login', 
  		:sign_out => 'logout', 
  		:sign_up => 'register'
  	}, 
  	:controllers => { 
  		registrations: 'registrations'
  	}
  
  devise_scope :user do
	  get "/login" => "devise/sessions#new"
	end

	get '/' => 'landing#index'

	# API ROUTES
	get '/api/documentation' => 'api#documentation'
	get '/api/tracking/pixel' => 'api#tracking_pixel_hit'
	post '/api/tracking/order' => 'api#order_track'

	# INTERNAL ROUTES
	get '/dashboard' => 'analytics#dashboard'
	get '/analytics/sales' => 'analytics#salesDataEndpoint'
	get '/analytics/site-traffic' => 'analytics#siteTrafficEndpoint'

	post '/report-bug' => 'application#report_bug'
	post '/send-contact' => 'application#send_contact'

	# USER ROUTES
	get '/websites' => 'user#websites'
	get '/websites/new' => 'user#new_website'
	post 'websites/create' => 'user#create_website'
	get '/settings' => 'user#settings'

end
