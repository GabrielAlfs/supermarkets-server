# SuperMarkets Server

A basic Node.js CRUD of Supermarkets with upload of images using NoSQL and AWS S3.

An interpretation of the Clean Architecture proposed by Robert C. Martin was used as project architecture, as well as other commonly used design patterns.

## Running the project

* **Installation and configuration**

    1. Install the packages using `npm install` or `yarn`
    2. Create a copy of the `.env.example` file and rename it to `.env`
    3. Fill the necessary environment variables

* **Build and running**

    1. Build using `npm run build` or `yarn build` or `sh ./build.sh`
    2. Run the project using `npm run start` or `yarn start`

### Entities

* SuperMarketEntity

```ts
  name: string;
  main_image: string;
  additional_images: Array<string>;
  location: TSuperMarketLocation;
  short_description: string;
  phone: string;
```

* TSuperMarketLocation

```ts
  street: string;
  number: string;
  district: string;
  zip: string;
  country: string;
  city: string;
  state: string;
```

### Casos de uso

* GetSuperMarketList
* GetSuperMarket
* CreateSuperMarket
* UpdateSuperMarket
* DeleteSuperMarket
