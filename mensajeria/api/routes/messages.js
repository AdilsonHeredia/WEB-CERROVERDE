const router = require("express").Router();
const Message = require("../models/Message");
const multer = require('multer');
const path = require('path');
const express = require('express');
//add
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos

router.post("/", upload.single('file'), async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    text: req.body.text,
    file: req.body.file,
    patientId: req.body.patientId,
  });


  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.put("/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            file: req.body.file,
          },
        },
        { new: true } // Return the updated document
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
