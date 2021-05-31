const Slider = require("../models/sliderModel");
const catchAsync = require("../utils/catchAsync");

exports.addSlider = catchAsync(async (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    const filename = req.file.filename;
    const slider = await Slider.create({ title,image:filename });
    res.status(201).json({
      data: slider,
    });
  });
  exports.deleteSlider = catchAsync(async (req, res) => {
    console.log(req.body);
    const { title } = req.body;
    const data = await Slider.findOneAndDelete({ title });
    res.status(200).json({
      data: data,
    });
  });
  exports.getAll = catchAsync(async (req, res) => {
    const data = await Slider.find();
    res.status(200).json({
      data: data,
    });
  });
  exports.getAllActive = catchAsync(async (req, res) => {
    const slider = await Slider.find({ active:true });
    res.status(201).json({
      data: slider,
    });
  });
  exports.activeSwitch = catchAsync(async (req, res) => {
    const { title } = req.params;
    console.log(title);
        const slider=await Slider.findOne({title});
        // console.log({actives:slider.active});
    const status=slider.active?false:true;
    const sl = await Slider.findByIdAndUpdate({_id:slider._id},{ active:status });
    res.status(201).json({
      data: sl,
    });
  });
  