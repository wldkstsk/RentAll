import {Component, OnInit} from '@angular/core';
import {Product} from 'src/app/common/product';
import {ProductService} from 'src/app/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppComponent} from "../../../app.component";
import {NgbDate, NgbDatepicker, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {ProductUnavailableView} from "../../../common/productunavailableview";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  productStatus = 'FREE';
  productConsumer = 0;
  appComponent: AppComponent;
  from: NgbDateStruct;
  to: NgbDateStruct;
  faCalendar = faCalendarAlt;
  markDisabled: (date: NgbDate) => {};
  refusedDates: ProductUnavailableView[];
  totalCost = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.appComponent = this.productService.getAppComponent();
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
      this.productService.listUnavailableDates(this.product.id).subscribe((data) => {
        this.refusedDates = data;
        this.disableDays();
      });
    });
  }

  disableDays() {
    this.markDisabled = (date: NgbDate) => {
      for (const interval of this.refusedDates) {
        if (interval.start === null || interval.end == null) {
          continue;
        }
        const start = new NgbDate(interval.start.getFullYear(), interval.start.getMonth(), interval.start.getDay());
        const end = new NgbDate(interval.end.getFullYear(), interval.end.getMonth(), interval.end.getDay());
        if ((date.after(start) || date.equals(start)) && (date.before(end) || date.equals(end))) {
          return true;
        }
      }
      return false;
    };
  }

  refreshCost(nVal: string, num: number) {
    const dt = new Date(nVal);
    const newVal = new NgbDate(dt.getFullYear(), dt.getMonth(), dt.getDay());
    let fr = null;
    let t = null;
    if (this.from != null) {
      fr = new NgbDate(this.from.year, this.from.month - 1, this.from.day - 1);
    }
    if (this.to != null) {
      t = new NgbDate(this.to.year, this.to.month - 1, this.to.day - 1);
    }
    if (num === 1) {
      fr = new NgbDate(newVal.year, newVal.month, newVal.day);
    } else {
      t = new NgbDate(newVal.year, newVal.month, newVal.day);
    }
    if (t.after(fr) || t.equals(fr)) {
      const diff = Math.abs(new Date(t.year, t.month, t.day).getTime() - new Date(fr.year, fr.month, fr.day).getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
      this.totalCost = this.product.unitPrice * diffDays;
      return;
    }
    this.totalCost = 0;
  }


  handleProductDetails() {

    // get the "id" param string. Convert string to a number using the + symbol
    const theProductId: number = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    );
    this.productService.getProductStatus(theProductId).subscribe(
      data => {
        this.productStatus = data.status;
      }
    );
    this.productService.getProductConsumer(theProductId).subscribe(
      data => {
        this.productConsumer = data;
      }
    );
  }

  reserveProduct(id: string) {
    this.productService.reserveProduct(id).subscribe(
      result => {
        if (result === true) {
          alert('Product reserved');
          window.location.reload();
        } else {
          alert('Product reservation failed');
        }
      }
    );
  }

  cancelProductReservation(id: string) {
    this.productService.cancelReservation(id).subscribe(
      result => {
        if (result === true) {
          alert('Product reservation cancelled');
          window.location.reload();
        } else {
          alert('Could not cancel product reservation');
        }
      }
    );
  }

  bookProduct(id: string) {
    this.productService.bookProduct(id).subscribe(
      result => {
        if (result === true) {
          alert('Product booked');
          window.location.reload();
        } else {
          alert('Product booking failed');
        }
      }
    );
  }

  returnProductConsumer(id: string) {
    this.productService.returnProductConsumer(id).subscribe(
      result => {
        if (result === true) {
          alert('Product returned');
          window.location.reload();
        } else {
          alert('Product return failed');
        }
      }
    );
  }

  returnProduct(id: string) {
    this.productService.returnProduct(id).subscribe(
      result => {
        if (result === true) {
          alert('Product return confirmed');
          window.location.reload();
        } else {
          alert('Product return failed');
        }
      }
    );
  }

}
