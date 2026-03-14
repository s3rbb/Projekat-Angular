import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Toy } from '../models/toy';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(toy: Toy): void {
    const exists = this.cart.find(item => item.toyId === toy.toyId);
    if (!exists) {
      this.cart.push({ ...toy, status: 'rezervisano' });
    }
  }

  removeFromCart(toyId: number): void {
    this.cart = this.cart.filter(item => item.toyId !== toyId);
  }

  updateCartItem(toyId: number, data: Partial<CartItem>): void {
    const item = this.cart.find(i => i.toyId === toyId);
    if (item) {
      Object.assign(item, data);
    }
  }

  rateToy(toyId: number, rating: number): void {
    const item = this.cart.find(i => i.toyId === toyId);
    if (item && item.status === 'pristiglo' && rating >= 1 && rating <= 5) {
      item.rating = rating;
    }
  }

  getTotal(): number {
    return this.cart.filter(item => item.status !== 'otkazano').reduce((sum, item) => sum + item.price, 0);
  }

  getRating(toyId: number): number | undefined {
    const item = this.cart.find(i => i.toyId === toyId);
    return item?.rating;
  }

  isInCart(toyId: number): boolean {
    return this.cart.some(item => item.toyId === toyId);
  }
}
