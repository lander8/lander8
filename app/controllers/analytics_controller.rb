class AnalyticsController < ApplicationController
	before_action :authenticate_user!

	def dashboard
		# @data = getData()
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


end
