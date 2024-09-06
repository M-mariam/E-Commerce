import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent {
  categories: any
private readonly _CategoriesService = inject(CategoriesService)
customOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: [],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
}
ngOnInit(): void{
  this._CategoriesService.getAllCategories().subscribe({
   next:(res) =>{
    this.categories = res.data
   }
  })
}
}