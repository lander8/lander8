class ApiController < ApplicationController
	skip_before_action :verify_authenticity_token
	before_action :find_website_by_api_key, except: [:documentation, :tracking_pixel_hit]

	def order_track
		o = Order.create(
			total: params[:total],
			subtotal: params[:subtotal],
			tax_total: params[:tax_total],
			shipping_total: params[:shipping_total],
			website_user_id: params[:user_id],
			website_order_id: params[:order_id],
			order_created_at: params[:created_at],
			website_id: @website.id
		)

		render json: { order: o }, status: 200
	end

	def documentation
		render 'docs', layout: 'landing'
	end

	def tracking_pixel_hit
		View.create(
			website_id: params[:website_id],
			website_user_id: params[:website_user_id] || nil
		)

		send_file 'public/tracking/pixel.png', type: 'image/png'
	end

	private

	def find_website_by_api_key
		@website = Website.where(api_key: params[:api_key]).first

		return true if @website.present?

		render json: { message: 'The API key you provided was invalid.' }, status: 401
	end
end
