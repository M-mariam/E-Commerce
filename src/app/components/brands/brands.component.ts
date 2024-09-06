import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands: any
private readonly _BrandsService = inject(BrandsService)
ngOnInit(): void{
  this._BrandsService.getAllBrands().subscribe({
   next:(res) =>{
    this.brands = res.data
   }
  })
}
}
