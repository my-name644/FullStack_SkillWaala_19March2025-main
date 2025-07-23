const api = require("express").Router();
const userController = require("../controller/user");
const adminController = require("../controller/admin");
const uploads = require("../middleware/multer");

api.get("/", (req, res) => {
  res.send("Hello Backend");
});
api.post("/regdata", userController.regDataController);
api.post("/loginuser", userController.loginDataController);
api.post(
  "/addadminproduct",
  uploads.single("image"),
  adminController.addAdminProductController
);
api.get("/getproduct", adminController.getAllProductsController);
api.delete("/productdelete/:id", adminController.deleteProductController);
api.get("/editvaluedata/:abc", adminController.editValueDataController);
api.put("/productupdate/:abc", adminController.updateProductController);
api.get("/userproducts", userController.userAllProducts);
api.post("/userquery", userController.userQueryController);
api.get("/userallquery", adminController.userAllQueryController);
api.delete("/deletequery/:abc", adminController.deleteQueryController);
api.get("/querysingledata/:abc", adminController.singleQueryController);
api.post("/mailreply/:abc", adminController.MailReplyController);

module.exports = api;
