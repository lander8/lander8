class CreateIntegrations < ActiveRecord::Migration[5.0]
  def change
    create_table :integrations do |t|
      t.string :integration_type
      t.string :auth_url
      t.string :name
      t.string :image_url

      t.timestamps
    end
  end
end
