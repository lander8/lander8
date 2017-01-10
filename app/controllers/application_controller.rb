class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource_or_scope)
		'/dashboard'
	end

	def report_bug
		AdminMailer.send_bug_report(current_user.id, params["report-body"]).deliver
	end

	def send_contact
		AdminMailer.send_contact_email(current_user.id, params["contact-body"]).deliver
	end
	
end
