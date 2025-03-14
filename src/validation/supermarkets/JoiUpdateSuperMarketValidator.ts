import Joi from 'joi';
import { IValidator } from '@presentation/common/Validator';
import { JoiValidator } from '@validation/common/JoiValidator';

export class JoiUpdateUserValidator extends JoiValidator implements IValidator {
  constructor(protected readonly joi: typeof Joi) {
    super();

    this.schema = this.joi.object().keys({
      id: this.joi.string().required(),
      name: this.joi.string().min(3).max(20),
      main_image: this.joi.object({
        extension: this.joi.string(),
        mimeType: this.joi.string(),
        size: this.joi.number(),
        content: this.joi.any(),
      }), // File
      additional_images: this.joi.array().items(
        this.joi.object({
          extension: this.joi.string(),
          mimeType: this.joi.string(),
          size: this.joi.number(),
          content: this.joi.any(),
        }), // File
      ),
      removed_additional_images: this.joi.array().items(this.joi.string()),
      short_description: this.joi.string().min(5).max(120),
      phone: this.joi
        .string()
        .regex(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])\d{3}-?\d{4}$/),
      number: this.joi.string().max(20),
      street: this.joi.string().max(200),
      zip: this.joi.string().regex(/^\d{5}-\d{3}$/),
      district: this.joi.string(),
      country: this.joi.string().max(100),
      city: this.joi.string().max(100),
      state: this.joi.string().max(40),
    });
  }
}
