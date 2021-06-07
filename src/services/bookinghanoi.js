import http from "../http-common";

class BookingDataService {
  getAll() {
    return http.get(`/hotels`);
  }

  bookingCrawl() {
    return http.get(`/bookingCrawl`);
  }

}
export default new BookingDataService();
