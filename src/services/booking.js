import http from "../http-common";

class BookingDataService {
  getAll() {
    return http.get(`/hotels`);
  }

  bookingCrawlHanoi() {
    return http.get(`/bookingCrawlHanoi`);
  }

  bookingCrawlHoChiMinh() {
    return http.get(`/bookingCrawlHoChiMinh`);
  }

  bookingCrawlNhaTrang() {
    return http.get(`/bookingCrawlNhaTrang`);
  }

  bookingCrawlDaLat() {
    return http.get(`/bookingCrawlDaLat`);
  }

}
export default new BookingDataService();
