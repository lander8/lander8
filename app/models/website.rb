class Website < ApplicationRecord
	belongs_to :user
	has_many :orders
	has_many :views
	has_one :twitter_account

	def active_integrations
		possible_integrations = ["Twitter"]
		integrations = []

		possible_integrations.each {|integration| integrations << (self.send("#{integration.downcase}_account").nil? ? nil : self.send("#{integration.downcase}_account").class.to_s.split("Account").first.downcase)}

		return integrations.compact!
	end
end
