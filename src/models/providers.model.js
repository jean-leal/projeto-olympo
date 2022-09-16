const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
  {
    provider_code: Number,
    provider_status: Number,
    provider_name: String,
    provider_fantasyName: String,
    provider_cnpj: String,
    provider_ie: String,
    provider_city: String,
    provider_state: String,
    provider_cep: String,
    provider_address: String,
    provider_number: String,
    provider_district: String,
    provider_phoneContact: String,
    provider_emailContact: String,
    provider_contact: String,
  },
  {
    timestamps: true,
  }
);

const providers = mongoose.model("Providers", DataSchema);
module.exports = providers;
