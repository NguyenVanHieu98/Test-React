

exports.name = "routes.api";

exports.requires = ["@express", 
"controllers.folder", 
"controllers.note", 
"controllers.share", 
"controllers.group", 
"controllers.task",
"controllers.booking",
"controllers.tripadvisor",
"controllers.myapp",
"controllers.bill"];

exports.factory = function (express, 
    folderController, 
    noteController, 
    shareController, 
    groupController, 
    taskController,
    bookingController,
    tripadvisorController,
    myappController,
    billController) {
    let router = express.Router();

    router.get("/folders", folderController.getFolders);
    router.post("/folders", folderController.newFolder);
    router.put("/folders/:folderId", folderController.updateFolder);
    router.get("/folders/:folderId", folderController.getFolderById);
    router.delete("/folders/:folderId", folderController.deleteFolder);
    router.get("/folder/:user", folderController.getFolderByUser);

    router.get("/notes/:folderId", noteController.getNotes);
    router.post("/notes", noteController.newNote);
    router.get("/note/:noteId", noteController.getNoteById);
    router.get("/notes", noteController.getAllNotes);
    router.put("/notes/:noteId", noteController.updateNote);
    router.put("/notes/:noteId", noteController.pinNoteToTop);
    router.post("/notes/:noteId", noteController.moveNote);
    router.delete("/notes/:noteId", noteController.deleteNote);

    router.get("/shares", shareController.getAllShares);
    router.get("/share/:shareId", shareController.getShareById);
    router.post("/share", shareController.newShare);
    router.get("/shares/:user",shareController.getShareByUser);
    router.delete("/share/:shareId", shareController.deleteShare);

    router.get("/groups", groupController.getAllGroupName);
    router.post("/groups", groupController.newGroup);

    router.post("/tasks", taskController.newTask);
    router.get("/task", taskController.getAll);
    router.get("/tasks", taskController.getAllTask);
    router.put("/tasks", taskController.addActionName);
    router.put("/tasknumber", taskController.addActionNameAndNumber);
    router.put("/task", taskController.updateAction);

    router.get("/run", taskController.run);

    router.get("/hotels", bookingController.getAll);
    router.get("/bookingCrawlHanoi", bookingController.bookingCrawlHanoi);
    router.get("/bookingCrawlHoChiMinh", bookingController.bookingCrawlHoChiMinh);
    router.get("/bookingCrawlNhaTrang", bookingController.bookingCrawlNhaTrang);
    router.get("/bookingCrawlDaLat", bookingController.bookingCrawlDaLat);


    router.get("/tripadvisorhotels", tripadvisorController.getAll);
    router.get("/datahotel/:name", tripadvisorController.getDataByName);
    router.get("/listhotels/:name", tripadvisorController.getDataLikeName);
    router.put("/updatedatas", tripadvisorController.updateDataHotel);
    router.get("/tripadvisorCrawlHanoi", tripadvisorController.tripadvisorCrawlHanoi);
    router.get("/tripadvisorCrawlHoChiMinh", tripadvisorController.tripadvisorCrawlHoChiMinh);
    router.get("/tripadvisorCrawlNhaTrang", tripadvisorController.tripadvisorCrawlNhaTrang);
    router.get("/tripadvisorCrawlDaLat", tripadvisorController.tripadvisorCrawlDaLat);


    router.get("/myappgetall", myappController.getAll);
    router.get("/myappgetbyname/:name", myappController.getDataByName);
    router.get("/myappsearchbyname/:name", myappController.getDataLikeName);
    router.put("/myappupdate", myappController.updateMyData);
    router.post("/myappcreatedata", myappController.createData);


    router.post("/bill", billController.newBill);
    router.get("/bills", billController.getAll);
    router.get("/bill/:email", billController.getBillByUser);
    router.get("/bills/:status", billController.getBillByStatus);
    router.get("/billss/:email", billController.getBillByUserAndStatus);
    router.get("/billsss/:email", billController.getBillByUserAndStatus1);
    router.put("/bill/:billId", billController.updateBill);
    router.delete("/bill/:billId", billController.deleteBill);

    // router.get('/folders', function (req, res, next) {
    //     var schema = mongoose.Schema({
    //         _id: mongoose.Types.ObjectId,
    //         title: String,
    //         key: String,
    //         isRoot: Boolean,
    //         isLeaf: Boolean,
    //         parentId: mongoose.Types.ObjectId
    //     });
    //     var Folders;
    //     // try {
    //     //     Folders = mongoose.model.Folders;
    //     // } catch (error) {
    //     //     Folders = mongoose.model("Folders", schema, "folders");
    //     // }
    //     if (!mongoose.models["folders"]) {
    //         Folders = mongoose.model("folders", schema);
    //     } else {
    //         Folders = mongoose.models["folders"];
    //     }

    //     Folders.find({}).then(function (folders) {
    //         res.json(folders);
    //     });
    // });

    // router.get('/folders/:folderId', function (req, res, next) {
    //     var schema = mongoose.Schema({
    //         _id: mongoose.Types.ObjectId,
    //         title: String,
    //         key: String,
    //         isRoot: Boolean,
    //         isLeaf: Boolean,
    //         parentId: mongoose.Types.ObjectId
    //     });
    //     var Folders;
    //     // try {
    //     //     Folders = mongoose.model.Folders;
    //     // } catch (error) {
    //     //     Folders = mongoose.model("Folders", schema, "folders");
    //     // }
    //     if (!mongoose.models["folders"]) {
    //         Folders = mongoose.model("folders", schema);
    //     } else {
    //         Folders = mongoose.models["folders"];
    //     }
    //     Folders.find({ parentId: mongoose.Types.ObjectId(req.params.folderId) }).then(function (folders) {
    //         res.json(folders);
    //     });
    // });

    return router;
};
