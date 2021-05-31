const express = require("express");
const Router = express.Router();
const apkController = require("../controller/apkController");
const authController = require("../controller/authController");
const sliderController=require("../controller/sliderController");
Router.get("/activesliders",sliderController.getAllActive);
Router.get("/approved", apkController.allApprovedApk);
Router.get("/trend", apkController.trendingApks);
Router.get("/papular", apkController.papularApks);
Router.get("/getAllCate", apkController.getAllCate);
Router.get("/download/:title", apkController.getDownload);
Router.get("/:title", apkController.getApk);
Router.get("/getcategory/:category", apkController.getcategory);

// here cate means subCate
Router.get("/samecate/:cate", apkController.getSameCateApps);
// protected routes
Router.use(authController.protect);
Router.post("/addApk", apkController.uploadImage, apkController.addApk);
Router.patch(
  "/addApkFile/:title",
  apkController.uploadFile,
  apkController.uploadFileHandler
);
Router.delete("/deletesubcate/:cate",apkController.deleteSubcategory);
Router.patch(
  "/addApkImages/:title",
  apkController.uploadMultiImages.array("images", 10),
  apkController.saveImages,
  apkController.uploadImagesHandler
);

Router.get("/allApk", apkController.getAllApk);

// restricted to admin
Router.use(authController.restrictTo("admin"));

Router.get("/states", apkController.getStates);

Router.delete("/deleteApk/:title", apkController.deleteApk);
Router.patch("/updateActions", apkController.updateActions);
// slider apis
Router.post("/allsliders",sliderController.getAll);
Router.post("/addSlider",
apkController.uploadImage,
sliderController.addSlider);
Router.delete("/deleteSlider",
sliderController.deleteSlider);
Router.patch("/activeSwitch/:title",
sliderController.activeSwitch);
// categories apis
Router.post("/addCate", apkController.addCategory);
Router.patch(
  "/addSubCate/:cate",
  apkController.uploadImage,
  apkController.addSubCategory
);
Router.get(
  "/subcate/:cate",
  apkController.getSubcategories
);
Router.delete("/deleteCate/:cate", apkController.removeCategory);

// Router.post("/signin", apkController.signin);
// Router.get("/getAll", apkController.getAllUsers);
module.exports = Router;
