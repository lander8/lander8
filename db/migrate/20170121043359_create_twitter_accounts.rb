class CreateTwitterAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :twitter_accounts do |t|
      t.integer :website_id
      t.string :token
      t.string :secret

      t.timestamps
    end
  end
end
