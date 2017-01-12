Raven.configure do |config|
  config.dsn = "https://#{ENV['SENTRY_KEY']}:#{ENV['SENTRY_SECRET']}@sentry.io/128505"
  config.environments = ['staging', 'production']
end
