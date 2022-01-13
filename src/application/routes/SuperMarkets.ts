import { AdaptRoute } from '@application/adapters/ExpressRouterAdapter';
import { buildSuperMarketHandler } from '@application/factories/SuperMarketHandlersFactory';
import { receiveUpload } from '@application/helpers/ReceiveUpload';
import { Router } from 'express';

export default (router: Router): void => {
  router.get(
    '/supermarkets',
    AdaptRoute(buildSuperMarketHandler('GetSuperMarketList')),
  );
  router.get(
    '/supermarkets/:id',
    AdaptRoute(buildSuperMarketHandler('GetSuperMarket')),
  );
  router.post(
    '/supermarkets',
    receiveUpload([
      { name: 'main_image', maxCount: 1 },
      { name: 'additional_images', maxCount: 10 },
    ]),
    AdaptRoute(buildSuperMarketHandler('CreateSuperMarket')),
  );
  router.put(
    '/supermarkets/:id',
    receiveUpload([
      { name: 'main_image', maxCount: 1 },
      { name: 'additional_images', maxCount: 10 },
    ]),
    AdaptRoute(buildSuperMarketHandler('UpdateSuperMarket')),
  );
  router.delete(
    '/supermarkets/:id',
    AdaptRoute(buildSuperMarketHandler('DeleteSuperMarket')),
  );
};
