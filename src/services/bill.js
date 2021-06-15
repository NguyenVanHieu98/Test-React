import http from "../http-common";

class BillService {

    getAll() {
        return http.get(`/bills`);
    }

    getBillByUser(email) {
        return http.get(`/bill/${email}`);
    }

    getBillByStatus(status) {
        return http.get(`/bill/${status}`);
    }

    getBillByUserAndStatus(email, status) {
        return http.get(`/bill/${email}/${status}`);
    }

    updateBill(billId) {
        return http.put(`/bill`, { billId });
    }

    createBill(name, email, phone, hotel, room, date, time) {
        return http.post(`/bill`, { name, email, phone, hotel, room, date, time });
    }

    delete(billId) {
        return http.delete(`/bill/${ billId }`);
    }

}
export default new BillService();
