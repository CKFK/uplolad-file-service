const express = require("express");
const fs = require("fs");

const UPLOAD_FOLDER = "uploads";
const ALLOWED_EXTENSIONS = ["txt", "pdf", "png", "jpg", "jpeg", "gif"];

// Security: Validate file type
const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop().toLowerCase();
  if (ALLOWED_EXTENSIONS.includes(extension)) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type"));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
