import http from "../http-common";

class MyAppService {
  getAll() {
    return http.get(`/myappgetall`);
  }

  getDataByName( name ) {
    return http.get(`/myappgetbyname/${name}`);
  }

  getDataLikeName( name ) {
    return http.get(`/myappsearchbyname/${name}`);
  }

  updateMyData( name, district, place, img, review, convenient, roomtype, comment ) {
    return http.put(`/myappupdate`, { name, district, place, img, review, convenient, roomtype, comment });
  }

  createData(name, district, place, img, review, convenient, roomtype, comment) {
    return http.post(`/myappcreatedata`, { name, district, place, img, review, convenient, roomtype, comment });
}

}
export default new MyAppService();
