const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')

const hashPassword = (pwd) => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10))

module.exports = {
  roles: [
    {
      code: 'ROL1',
      value: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: 'ROL3',
      value: 'Owner',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: 'ROL5',
      value: 'Agent',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: 'ROL7',
      value: 'Customer',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  users: Array.from([...Array(10).keys()]).map(() => ({
    name: faker.person.fullName(),
    phone: '0' + faker.string.numeric(9),
    email: faker.internet.email({
      provider: 'gmail.com',
      allowSpecialCharacters: false,
    }),
    address: faker.address.streetAddress({ usefullAddress: true }),
    password: hashPassword('123456'),
    avatar: faker.image.avatar(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  user_roles: [
    ...Array.from([...Array(10).keys()]).map((el) => ({
      userId: el + 1,
      roleCode: 'ROL7',
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {
      userId: 8,
      roleCode: 'ROL5',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 9,
      roleCode: 'ROL3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 10,
      roleCode: 'ROL1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 7,
      roleCode: 'ROL3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  property_types: [
    {
      name: 'House',
      images: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: 'house',
      }),
      description: faker.lorem.sentence({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Apartment',
      images: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: 'house',
      }),
      description: faker.lorem.sentence({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Townhouse',
      images: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: 'house',
      }),
      description: faker.lorem.sentence({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  properties: Array.from([...Array(50).keys()]).map(() => ({
    name: faker.lorem.sentences({ max: 2, min: 1 }).replace('.', ' '),
    description: faker.lorem.sentences({ min: 5, max: 10 }),
    listingType: faker.helpers.arrayElement(['SALE', 'RENTAL']),
    price: faker.number.int({ max: 100000, min: 1000 }),
    propertyTypeId: faker.number.int({ max: 3, min: 1 }),
    owner: faker.helpers.arrayElement([7, 9]),
    status: 'PENDING',
    isAvaliable: true,
    featuredImage: faker.image.urlLoremFlickr({ category: 'realestate' }),
    images: JSON.stringify(
      Array.from([...Array(faker.number.int({ max: 7, min: 5 })).keys()]).map(
        () =>
          `${faker.image.urlLoremFlickr({
            category: 'realestate',
          })}?random=${faker.string.numeric(30)}`
      )
    ),
    postedBy: faker.helpers.arrayElement([7, 9, 8]),
    bedRoom: faker.number.int({ max: 3, min: 1 }),
    bathRoom: faker.number.int({ max: 3, min: 1 }),
    propertySize: faker.number.int({ max: 200, min: 25 }),
    yearBuilt: faker.number.int({ max: 2024, min: 1945 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  features: [
    {
      name: 'Air Conditioning',
      image: faker.image.urlLoremFlickr({ category: 'air condditioning' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Furnance',
      image: faker.image.urlLoremFlickr({ category: 'furnance' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Pool',
      image: faker.image.urlLoremFlickr({ category: 'pool' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Garage',
      image: faker.image.urlLoremFlickr({ category: 'garage' }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  property_features: Array.from([...Array(60).keys()]).map((el) => ({
    createdAt: new Date(),
    updatedAt: new Date(),
    propertyId: faker.number.int({ max: 4, min: 1 }),
    featureId: faker.number.int({ max: 4, min: 1 }),
  })),
}
