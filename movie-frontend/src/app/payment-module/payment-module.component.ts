import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {loadScript} from "@paypal/paypal-js";
import {BookingInfoService} from "../booking-info.service";
import {PaymentInfoService} from "../payment-info.service";


declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: { order: { create: (arg0: { purcchase_units: { description: string; amount: { currency_code: string; }; }[]; }) => any; }; }) => any; onApprove: (data: any, actions: { order: { capture: () => any; }; }) => Promise<void>; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };
@Component({
  selector: 'app-payment-module',
  templateUrl: './payment-module.component.html',
  styleUrls: ['./payment-module.component.css']
})
export class PaymentModuleComponent implements OnInit{
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  product = {
    price: this.bookingService.totalTicketPrice,
    description: 'movie tickets',
  }

  constructor(private bookingService: BookingInfoService,
              private paymentInfoService: PaymentInfoService) {}

  ngOnInit() {
    loadScript({
      clientId: "AWWuuY3tytu1XayrLLN5gf1pwLXgNvfrCkUT3_15TC6R04bOzSeV7Jv_1wr56vNTbtSUqnK8yY2fMuBV",
    }).then(() => {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paymentInfoService.setPaidStatus(true);
        },
      }).render(this.paypalElement?.nativeElement);
    });
  }
}
