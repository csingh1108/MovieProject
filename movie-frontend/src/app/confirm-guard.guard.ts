import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {BookingInfoService} from "./booking-info.service";


export const confirmGuardGuard: CanActivateFn = (next, state) => {
  const bookingService = inject(BookingInfoService)
  const router = inject(Router)
  if (bookingService.movieTitle && bookingService.selectedTimeSlot && bookingService.selectedSeats.length > 0) {
    return true;
  } else {
    router.navigate(['/']); // Redirect to movie details page if data is missing
    return false;
  }
}
