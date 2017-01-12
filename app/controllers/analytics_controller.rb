class AnalyticsController < ApplicationController
	before_action :authenticate_user!

	def dashboard
		cuurent_user.coolness_level
		render 'index'
	end

	def sales_data_endpoint
		data = {}
		current_user.websites.each do |website|
			requested_orders = website.orders.where('orders.created_at > ?', (Time.now - params[:days].to_i.days))

			data[website.name] = {
				orders: requested_orders.map { |order|
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

	def site_traffic_endpoint
		data = {}

		current_user.websites.each do |website|
			requested_days = website.views.where('views.created_at > ?', (Time.now - params[:days].to_i.days))

			data[website.name] = {
				traffic: requested_days.map do |view|
					{
						user_id: view.website_user_id,
						created_at: view.created_at
					}
				end
			}
		end

		render json: data
	end

	# Generates a CSV and sends it to the user
	# TODO: make this useful
	def generate_csv
		data = CSV.generate do |csv|
		  csv << ['row', 'of', 'CSV', 'data']
		  csv << ['another', 'row']
		end

		send_data data, type: 'text/csv', filename: 'your_data.csv'
	end
end
