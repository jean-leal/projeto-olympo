const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    group_code: Number,
    group_name: String,
    provider_code: Number,
    provider_status: Number,
    provider_name: String,
    provider_fantasyName: String,
    provider_cnpj: Number,
    provider_ie: Number,
    provider_city: String,
    provider_state: String,
    provider_cep: Number,
    provider_address: String,
    provider_number: Number,
    provider_district: String,
    provider_phoneContact: Number,
    provider_emailContact: String,
    provider_contact: String,
  },
  {
    timestamps: true,
  }
);

const providers = mongoose.model("Providers", DataSchema);
module.exports = providers;
