class AnalyticsController < ApplicationController
	before_action :authenticate_user!
	before_action :ensure_selected_website!

	def dashboard
		@stats = {
			orders_today: current_website.orders.where('orders.order_created_at > ?', Time.zone.now.beginning_of_day).count,
			orders_this_week: current_website.orders.where('orders.order_created_at > ?', Time.zone.now.beginning_of_week).count,
			orders_this_month: current_website.orders.where('orders.order_created_at > ?', Time.zone.now.beginning_of_month).count,
			views_today: current_website.views.where('views.created_at > ?', Time.zone.now.beginning_of_day).count,
			views_this_week: current_website.views.where('views.created_at > ?', Time.zone.now.beginning_of_week).count,
			views_this_month: current_website.views.where('views.created_at > ?', Time.zone.now.beginning_of_month).count
		}

		@website = current_website

		render 'index'
	end

	def sales_data_endpoint
		# Only fetch the orders we actually need
		requested_orders = current_website.orders.where('orders.order_created_at > ?', (Time.current - params[:days].to_i.days))

		# Create a new hash with a default value of 0
		if params[:days].to_i > 1
			orders = ((Date.today - params[:days].to_i.days).to_date..Date.today).map { |date| { date.strftime('%Y-%m-%d') => 0 } }.reduce({}, :merge)

			requested_orders.each { |order|
				orders[order.order_created_at.to_date.strftime('%Y-%m-%d')] += order.total
			}
		else
			orders = (DateTime.now - 1.day).step(DateTime.now, 1.to_f / 24).map { |date| { date.strftime('%Y-%m-%dT%H:00:00') => 0 } }.reduce({}, :merge)
			requested_orders.each { |order|
				orders[order.order_created_at.to_date.strftime('%Y-%m-%dT%H:00:00')] += order.total
			}
		end

		render json: orders
	end

	def site_traffic_endpoint
		requested_views = current_website.views.where('views.created_at > ?', (Time.current - params[:days].to_i.days))

		if params[:days].to_i > 1
			views = ((Date.today - params[:days].to_i.days).to_date..Date.today).map { |date| { date.strftime('%Y-%m-%d') => 0 } }.reduce({}, :merge)

			requested_views.each { |view|
				views[view.created_at.to_date.strftime('%Y-%m-%d')] += 1
			}
		else
			views = (DateTime.now - 1.day).step(DateTime.now, 1.to_f / 24).map { |date| { date.strftime('%Y-%m-%dT%H:00:00') => 0 } }.reduce({}, :merge)

			requested_views.each { |view|
				views[view.created_at.to_date.strftime('%Y-%m-%dT%H:00:00')] += 1
			}
		end

		render json: views
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
