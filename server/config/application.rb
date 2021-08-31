require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
require 'rails/test_unit/railtie'
require 'dry/monads'

Bundler.require(*Rails.groups)
Dotenv::Railtie.load


module Server
  class Application < Rails::Application
    is_stackprof =  ENV['ENABLE_STACKPROF'].to_i.nonzero?
    stackprof_path =  ENV['STACKPROF_PATH']
    config.load_defaults 6.1
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*',
                 headers: :any,
                 methods: %i[get post options head]
      end
    end

    config.public_file_server.enabled = false
    config.autoload_paths += %W(#{config.root}/lib/validators/)
    config.middleware.use(Rack::Throttle::Second, :max => 100)
    config.middleware.use(StackProf::Middleware,
                          enabled: is_stackprof,
                          mode: :cpu,
                          interval: 1000,
                          save_every: 5,
                          path: stackprof_path)
  end
end
