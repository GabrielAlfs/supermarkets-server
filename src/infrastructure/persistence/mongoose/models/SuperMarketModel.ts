import { TSuperMarketLocation } from '@domain/supermarkets/entities/SuperMarket';
import { TSuperMarketDto } from '@implementation/supermarkets/contracts/SuperMarketDto';
import { model, Schema } from 'mongoose';

const superMarketLocationSchema = new Schema<TSuperMarketLocation>({
  number: { type: String, default: 'S/N' },
  street: { type: String, required: true },
  district: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const superMarketSchema = new Schema<TSuperMarketDto>(
  {
    name: { type: String, required: true },
    main_image: { type: String, required: true },
    additional_images: { type: [String] },
    location: { type: superMarketLocationSchema, required: true },
    short_description: { type: String },
    phone: { type: String, required: true },
  },
  {
    id: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'SuperMarkets',
  },
);

export const superMarketModel = model<TSuperMarketDto>(
  'SuperMarket',
  superMarketSchema,
);
