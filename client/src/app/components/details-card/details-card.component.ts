import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-details-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.css'
})
export class DetailsCardComponent {

  constructor(private cartService: CartService, private notificationService: NotificationService) {}

  addToCart(product: any) {
      this.cartService.addToCart(product);
      this.notificationService.showMessage;
    }

  @Input() product!: any;
}
