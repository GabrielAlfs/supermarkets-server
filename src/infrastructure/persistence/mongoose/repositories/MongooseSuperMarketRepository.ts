import { TNullable } from '@implementation/common/RepositoryReturn';
import { TSuperMarketDto } from '@implementation/supermarkets/contracts/SuperMarketDto';
import { SuperMarketRepository } from '@implementation/supermarkets/contracts/SuperMarketRepository';
import { isValidObjectId, Model } from 'mongoose';

export class MongooseSuperMarketRepository implements SuperMarketRepository {
  constructor(private readonly model: Model<TSuperMarketDto>) {}

  async findAllSuperMarkets(): Promise<Array<TSuperMarketDto>> {
    return this.model.find().exec();
  }

  async findSuperMarket(id: string): Promise<TNullable<TSuperMarketDto>> {
    if (!isValidObjectId(id)) return null;

    return this.model.findById(id);
  }

  async createSuperMarket({
    name,
    main_image,
    additional_images,
    location,
    short_description,
    phone,
  }: Omit<
    TSuperMarketDto,
    'id' | 'created_at' | 'updated_at'
  >): Promise<TSuperMarketDto> {
    const superMarket = await this.model.create({
      name,
      main_image,
      additional_images,
      location,
      short_description,
      phone,
    });

    return superMarket;
  }

  async updateSuperMarket(
    data: { id: string } & Partial<Omit<TSuperMarketDto, 'id'>>,
  ): Promise<TSuperMarketDto> {
    const updatedSuperMarket = await this.model
      .findByIdAndUpdate(data.id, { ...data })
      .exec();

    return updatedSuperMarket!;
  }

  async deleteSuperMarket(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
