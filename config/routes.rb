Rails.application.routes.draw do
	root 'landing#index'

	devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }, controllers: { registrations: 'registrations' }

	devise_scope :user do
		get '/login' => 'devise/sessions#new'
	end

	scope '/api' do
		get '/documentation' => 'api#documentation'
		get '/tracking/pixel' => 'api#tracking_pixel_hit'
		post '/tracking/order' => 'api#order_track'
	end

	scope '/analytics' do
		get '/sales/:days' => 'analytics#sales_data_endpoint'
		get '/site-traffic/:days' => 'analytics#site_traffic_endpoint'
	end

	scope '/websites' do
		get '/' => 'user#websites'
		get '/new' => 'website#new'
		get '/select' => 'user#select_website'
		get '/select/:id' => 'user#set_selected_website'
		get '/:id' => 'website#show'
		post '/create' => 'website#create'
	end

	# Other routes
	get '/dashboard' => 'analytics#dashboard'
	get '/settings' => 'user#settings'

	post '/report-bug' => 'application#report_bug'
	post '/send-contact' => 'application#send_contact'
end
