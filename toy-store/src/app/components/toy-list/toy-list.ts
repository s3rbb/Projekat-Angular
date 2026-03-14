import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToyService } from '../../services/toy.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Toy, AgeGroup, ToyType } from '../../models/toy';

@Component({
  selector: 'app-toy-list',
  imports: [
    FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSnackBarModule,
  ],
  templateUrl: './toy-list.html',
  styleUrl: './toy-list.scss',
})
export class ToyListComponent implements OnInit {
  toys: Toy[] = [];
  filteredToys: Toy[] = [];
  ageGroups: AgeGroup[] = [];
  types: ToyType[] = [];

  searchName = '';
  selectedType = '';
  selectedAgeGroup = '';
  selectedTargetGroup = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(
    private toyService: ToyService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.toyService.getAllToys().subscribe(toys => {
      this.toys = toys;
      this.filteredToys = toys;
    });
    this.toyService.getAgeGroups().subscribe(groups => this.ageGroups = groups);
    this.toyService.getTypes().subscribe(types => this.types = types);
  }

  applyFilters(): void {
    this.filteredToys = this.toys.filter(toy => {
      const matchesName = !this.searchName ||
        toy.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesType = !this.selectedType ||
        toy.type.name === this.selectedType;
      const matchesAge = !this.selectedAgeGroup ||
        toy.ageGroup.name === this.selectedAgeGroup;
      const matchesTarget = !this.selectedTargetGroup ||
        toy.targetGroup === this.selectedTargetGroup;
      const matchesMinPrice = this.minPrice === null || toy.price >= this.minPrice;
      const matchesMaxPrice = this.maxPrice === null || toy.price <= this.maxPrice;
      return matchesName && matchesType && matchesAge && matchesTarget && matchesMinPrice && matchesMaxPrice;
    });
  }

  resetFilters(): void {
    this.searchName = '';
    this.selectedType = '';
    this.selectedAgeGroup = '';
    this.selectedTargetGroup = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredToys = this.toys;
  }

  reserve(toy: Toy): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    if (this.cartService.isInCart(toy.toyId)) {
      this.snackBar.open('Igracka je vec u korpi', 'OK', { duration: 2000 });
      return;
    }
    this.cartService.addToCart(toy);
    this.snackBar.open('Igracka je rezervisana', 'OK', { duration: 2000 });
  }

  getImageUrl(toy: Toy): string {
    return this.toyService.getImageUrl(toy.imageUrl);
  }

  isInCart(toyId: number): boolean {
    return this.cartService.isInCart(toyId);
  }

  getRating(toyId: number): number | undefined {
    return this.cartService.getRating(toyId);
  }

  getStars(rating: number | undefined): boolean[] {
    const r = rating || 0;
    return [1, 2, 3, 4, 5].map(i => i <= r);
  }
}
