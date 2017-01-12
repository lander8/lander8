class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	before_action :set_raven_context

	def after_sign_in_path_for(*)
		'/dashboard'
	end

	def report_bug
		AdminMailer.send_bug_report(current_user.id, params['report-body']).deliver
	end

	def send_contact
		AdminMailer.send_contact_email(current_user.id, params['contact-body']).deliver
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
end
