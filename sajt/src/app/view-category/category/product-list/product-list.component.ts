import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  searchMode: boolean =  false;
  citySearchMode : boolean = false;

  // new properties for pagination
  thePageNumber: number =1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
}
  listProducts() {
    this.handleSearchProducts();
  }

  handleSearchProducts() {
    this.route.queryParams.subscribe(params => {
      const filter: string = params['filter'];
      const city: string = params['city'];
      const category: string = params['category'];
      this.productService.searchProducts(filter, city, category).subscribe(
        data => {
          this.products = data;
        }
      );
    });
  }


  handleCitySearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('cityName');
    this.productService.searchCityProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }


  handleListProducts() {

     // check if "id" parameter is available
     const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

     if (hasCategoryId) {
       // get the "id" param string. convert string to a number using the "+" symbol
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
     }
     else {
       // not category id available ... default to category id 1
       this.currentCategoryId = 1;
     }

   //
   // Check if we have a different category than previous
   // because of Angular will reuse a component if it is currently being viewed
   //

   // if we have a different category id than previous
   // then set thePageNumber back to 1
   if (this.previousCategoryId != this.currentCategoryId) {
     this.thePageNumber = 1;
   }

   this.previousCategoryId = this.currentCategoryId;

   console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

     // now get the products for the given category id
     this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(this.processResult());

  }

  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
