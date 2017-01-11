require 'mandrill'

class BaseMandrillMailer < ActionMailer::Base
	default(
		from: 'Lander8 <hello@lander8.com>',
		reply_to: 'hello@lander8.com'
	)

	private

	def send_mail(email, subject, body)
		mail(to: email, subject: subject, body: body, content_type: 'text/html')
	end

	def send_admin_mail(reply_to, email, subject, body)
		mail(reply_to: reply_to, to: email, subject: subject, body: body, content_type: 'text/html')
	end

	def mandrill_template(template_name, attributes)
		mandrill = Mandrill::API.new(ENV['SMTP_PASSWORD'])

		merge_vars = attributes.map do |key, value|
			{ name: key, content: value }
		end

		mandrill.templates.render(template_name, [], merge_vars)['html']
	end
end
