import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {AppComponent} from '../app.component';
import {User} from '../common/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from "../_alert";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  appComponent: AppComponent;
  user: User;
  userId: number;
  authorMap: Map<number, User> = new Map<number, User>();
  ratings: Array<number>;

  constructor(private productService: ProductService, private route: ActivatedRoute, private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.appComponent = this.productService.getAppComponent();
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.loadUser();
  }

  loadUser() {
    this.productService.getUser(this.userId).subscribe(data => {
      this.user = data;
      this.ratings = Array(this.user.rating).fill(0).map((x, i) => i);
      this.user.opinions.forEach(o => {
        this.productService.getUser(o.authorId).subscribe(author => {
          this.authorMap.set(o.authorId, author);
        });
      });
    });
  }

  saveUser() {
    this.productService.editUser(this.userId, this.user).subscribe(data => {
      this.user = data;
      this.alertService.success('User updated');
    });
  }

  changePassword() {
    this.router.navigate(['/resetPassword']);
  }

  counter(i: number) {
    return new Array(i);
  }
}
