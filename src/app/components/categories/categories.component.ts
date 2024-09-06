import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: any
private readonly _CategoriesService = inject(CategoriesService)
ngOnInit(): void{
  this._CategoriesService.getAllCategories().subscribe({
   next:(res) =>{
    this.categories = res.data
   }
  })
}
}
