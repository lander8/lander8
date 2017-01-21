class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	before_action :set_raven_context

	helper_method :current_website

	def after_sign_in_path_for(*)
		'/dashboard'
	end

	def report_bug
		AdminMailer.send_bug_report(current_user.id, params['report-body']).deliver
	end

	def send_contact
		AdminMailer.send_contact_email(current_user.id, params['contact-body']).deliver
	end

	protected

	def current_website
		session[:current_website].present? ? current_user.websites.find(session[:current_website]) : nil
	end

	private

	# This is what gets sent to Sentry on errors
	def set_raven_context
		Raven.user_context(
			id: current_user.present? ? current_user.id : nil,
			email: current_user.present? ? current_user.email : nil,
			ip_address: request.ip
		)
		Raven.extra_context(params: params.to_unsafe_h, url: request.url)
	end

	def ensure_selected_website!
		return true if current_website.present?

		if current_user.websites.count == 1
			session[:current_website] = current_user.websites.first.id
		elsif current_user.websites.count == 0
			redirect_to '/websites'
		else
			redirect_to '/websites/select' 
		end
	end
end
