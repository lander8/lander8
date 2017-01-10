User.create([
	{email: "michael@fragstudio.com", name: "Michael Rosenberg", password: "password"},
	{email: "clarinda1017@gmail.com", name: "Clarinda Arrunategui", password: "password"},
	{email: "pedro@fossbytes.net", name: "Pedro Guadalupe", password: "password"},
	{email: "jennifer@gmail.com", name: "Jennifer Rothman", password: "password"},
	{email: "philip@zinc.net", name: "Philip Mandleson", password: "password"},
	{email: "diego@viacom.com", name: "Diego Stanley", password: "password"},
	{email: "test@lander8.com", name: "Test User", password: "password"}
])

Website.create(
	name: "Testico Labs",
	url: "http://test.lander8.com",
	user_id: User.where(email: "test@lander8.com").last.id,
	api_key: "lndr8_#{SecureRandom.urlsafe_base64}"
)

Website.create(
	name: "Trialated Studio",
	url: "http://trial.lander8.com",
	user_id: User.where(email: "test@lander8.com").last.id,
	api_key: "lndr8_#{SecureRandom.urlsafe_base64}"
)

# Create a bunch of orders for our test user
for i in 0..500 
	Website.where(user_id: User.where(email: "test@lander8.com").last.id).each do |website|
		Order.create(
			total: rand() * rand(5..100),
			subtotal: rand() * rand(5..100),
			tax_total: rand() * rand(5..100),
			shipping_total: rand() * rand(5..100),
			website_user_id: rand(1..300),
			website_order_id: i,
			order_created_at: rand(Time.parse("{2016-12-1}")..Time.parse("{#{Time.now.year}-#{Time.now.month}-#{Time.now.day}}")),
			website_id: website.id
		)

		View.create(
			website_id: website.id,
			created_at: rand(Time.parse("{2016-12-1}")..Time.parse("{#{Time.now.year}-#{Time.now.month}-#{Time.now.day}}"))
		)	
	end
end

