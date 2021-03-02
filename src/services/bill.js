import http from "../http-common";

class BillService {

    getAll() {
        return http.get(`/bills`);
    }

    getBillByUser(email) {
        return http.get(`/bill/${email}`);
    }

    updateBill(name, roomtype, comment) {
        return http.put(`/bill`, { name, roomtype, comment });
    }

    createBill(name, email, phone, hotel, room) {
        return http.post(`/bill`, { name, email, phone, hotel, room });
    }

    delete(billId) {
        return http.delete(`/bill/${ billId }`);
    }

}
export default new BillService();
