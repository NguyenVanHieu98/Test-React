import http from "../http-common";

class TripadvisorDataService {
  getAll() {
    return http.get(`/tripadvisorhotels`);
  }

  getDataByName( name ) {
    return http.get(`/datahotel/${name}`);
  }

  getDataLikeName( name ) {
    return http.get(`/listhotels/${name}`);
  }

  updateDataHotel( name, roomtype, comment ) {
    return http.put(`/updatedatas`, { name, roomtype, comment });
  }

}
export default new TripadvisorDataService();
