class AnalyticsController < ApplicationController
	before_action :authenticate_user!

	def dashboard
		render 'index'
	end

	def salesDataEndpoint
		data = {}

		current_user.websites.each do |website|
			data[website.name] = {
				orders: website.orders.map{ |order| 
					{
						order_id: order.website_order_id, 
						total: order.total, 
						subtotal: order.subtotal, 
						tax_total: order.tax_total, 
						shipping_total: order.shipping_total, 
						user_id: order.website_user_id, 
						created_at: order.order_created_at
					} 
				}
			}
		end

		render json: data
	end

	def siteTrafficEndpoint
		data = {}

		current_user.websites.each do |website|
			data[website.name] = {
				traffic: website.views.map{ |view| 
					{
						user_id: view.website_user_id, 
						created_at: view.created_at
					} 
				}
			}
		end

		render json: data
	end

	# Generates a CSV and sends it to the user
	# TODO: make this useful
	def generate_csv
		data = CSV.generate do |csv|
		  csv << ["row", "of", "CSV", "data"]
		  csv << ["another", "row"]
		end

		send_data data, :type=> 'text/csv', :filename => 'your_data.csv'
	end

end
