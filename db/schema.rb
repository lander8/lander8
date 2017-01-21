# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170121045059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "integrations", force: :cascade do |t|
    t.string   "integration_type"
    t.string   "auth_url"
    t.string   "name"
    t.string   "image_url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "orders", force: :cascade do |t|
    t.float    "total"
    t.float    "subtotal"
    t.float    "tax_total"
    t.float    "shipping_total"
    t.integer  "website_id"
    t.integer  "website_user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "website_order_id"
    t.datetime "order_created_at"
  end

  create_table "twitter_accounts", force: :cascade do |t|
    t.integer  "website_id"
    t.string   "token"
    t.string   "secret"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "name"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "views", force: :cascade do |t|
    t.integer  "website_id"
    t.integer  "website_user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "websites", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.string   "url"
    t.string   "api_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
