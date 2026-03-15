import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { ToyService } from '../../services/toy.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  imports: [
    FormsModule,
    MatCardModule, MatButtonModule, MatIconModule, MatTableModule,
    MatSelectModule, MatFormFieldModule, MatInputModule, MatSnackBarModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent {
  displayedColumns = ['image', 'name', 'type', 'ageGroup', 'price', 'status', 'rating', 'actions'];
  dataSource: CartItem[] = [];

  constructor(
    public cartService: CartService,
    private toyService: ToyService,
    private snackBar: MatSnackBar,
  ) {
    this.refreshData();
  }

  refreshData(): void {
    this.dataSource = [...this.cartService.getCart()];
  }

  getImageUrl(item: CartItem): string {
    return this.toyService.getImageUrl(item.imageUrl);
  }

  changeStatus(item: CartItem, status: 'rezervisano' | 'pristiglo' | 'otkazano'): void {
    this.cartService.updateCartItem(item.toyId, { status });
    this.refreshData();
  }

  remove(item: CartItem): void {
    this.cartService.removeFromCart(item.toyId);
    this.refreshData();
    this.snackBar.open('Igracka je uklonjena iz korpe.', 'OK', { duration: 2000 });
  }

  rate(item: CartItem, rating: number): void {
    this.cartService.rateToy(item.toyId, rating);
    this.refreshData();
    this.snackBar.open(`Ocena ${rating} je sacuvana.`, 'OK', { duration: 2000 });
  }

  getStars(rating: number | undefined): boolean[] {
    const r = rating || 0;
    return [1, 2, 3, 4, 5].map(i => i <= r);
  }
}
