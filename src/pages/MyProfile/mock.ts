import type { MyWineItem } from './MyWines';

export const myReviewCount = 8;

export const registeredWineItems: MyWineItem[] = [
  {
    id: 1,
    name: 'Maison Vert Reserve',
    region: 'Loire, France',
    price: 'KRW 24,000',
    type: 'WHITE',
    imageUrl: '/assets/images/img-productImage-01.png',
  },
  {
    id: 2,
    name: 'Golden Field Riesling',
    region: 'Mosel, Germany',
    price: 'KRW 31,000',
    type: 'WHITE',
    imageUrl: '/assets/images/img-productImage-02.png',
  },
  {
    id: 3,
    name: 'Silver Oak Blend',
    region: 'Napa Valley, USA',
    price: 'KRW 42,000',
    type: 'RED',
    imageUrl: '/assets/images/img-productImage-03.png',
  },
  {
    id: 4,
    name: 'Terra Rosa Syrah',
    region: 'Barossa, Australia',
    price: 'KRW 36,000',
    type: 'RED',
    imageUrl: '/assets/images/img-productImage-01.png',
  },
  {
    id: 5,
    name: 'Luna Bianca',
    region: 'Tuscany, Italy',
    price: 'KRW 28,000',
    type: 'SPARKLING',
    imageUrl: '/assets/images/img-productImage-02.png',
  },
];
