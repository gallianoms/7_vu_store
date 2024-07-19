import { TestBed } from '@angular/core/testing';

import { GenericService } from './generic.service';
import { Product } from '../interfaces/product/product.interface';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment.development';

const DUMMY_RESPONSE = [
  {
    title: 'title',
    price: 1,
    description: 'description',
    images: ['imageUrl'],
    category: {
      id: 1,
      name: 'categoryName',
      image: 'categoryImage',
      creationAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    id: 1,
    creationAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
  {
    title: 'title2',
    price: 2,
    description: 'description2',
    images: ['imageUrl2'],
    category: {
      id: 2,
      name: 'categoryName2',
      image: 'categoryImage2',
      creationAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
    id: 2,
    creationAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
  },
];

describe('GenericService', () => {
  let service: GenericService<Product>;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GenericService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    service.getAll('products').subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBeGreaterThan(1);
      expect(products).toEqual(DUMMY_RESPONSE);
    });

    const req = httpTesting.expectOne(environment.API_URL + 'products');
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_RESPONSE);
  });

  it('should get one product by id', () => {
    service.getOne('products/', 1).subscribe(product => {
      expect(product).toBeTruthy();
      expect(product).toEqual(DUMMY_RESPONSE[0]);
    });

    const req = httpTesting.expectOne(environment.API_URL + 'products/' + 1);
    expect(req.request.method).toBe('GET');
    req.flush(DUMMY_RESPONSE[0]);
  });

  it('should create product', () => {
    service.create('products', DUMMY_RESPONSE[0]).subscribe(product => {
      expect(product).toBeTruthy();
      expect(product).toEqual(DUMMY_RESPONSE[0]);
    });

    const req = httpTesting.expectOne(environment.API_URL + 'products');
    expect(req.request.method).toBe('POST');
    req.flush(DUMMY_RESPONSE[0]);
  });

  it('should update product by id', () => {
    service.update('products/', 1, DUMMY_RESPONSE[0]).subscribe(product => {
      expect(product).toBeTruthy();
      expect(product).toEqual(DUMMY_RESPONSE[0]);
    });

    const req = httpTesting.expectOne(environment.API_URL + 'products/' + 1);
    expect(req.request.method).toBe('PUT');
    req.flush(DUMMY_RESPONSE[0]);
  });

  it('should delete product by id', () => {
    service.delete('products/', 1).subscribe(product => {
      expect(product).toBeTruthy();
    });

    const req = httpTesting.expectOne(environment.API_URL + 'products/' + 1);
    expect(req.request.method).toBe('DELETE');
    req.flush(DUMMY_RESPONSE[0]);
  });
});
