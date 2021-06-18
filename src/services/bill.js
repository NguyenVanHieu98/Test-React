import http from "../http-common";

class BillService {

    getAll() {
        return http.get(`/bills`);
    }

    getBillByUser(email) {
        return http.get(`/bill/${email}`);
    }

    getBillByStatus(status) {
        return http.get(`/bills/${status}`);
    }

    getBillByUserAndStatus(email) {
        return http.get(`/billss/${email}`);
    }

    getBillByUserAndStatus1(email) {
        return http.get(`/billsss/${email}`);
    }

    updateBill(billId, data) {
        return http.put(`/bill/${billId}`, data);
    }

    createBill(name, email, phone, hotel, room, date, time) {
        return http.post(`/bill`, { name, email, phone, hotel, room, date, time });
    }

    delete(billId) {
        return http.delete(`/bill/${ billId }`);
    }

}
export default new BillService();
