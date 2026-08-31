const { LetterTemplate } = require("../models");

// Get all letter templates
exports.getAllLetterTemplates = async (req, res) => {
  try {
    const templates = await LetterTemplate.findAll();
    res.status(200).json({
      success: true,
      data: templates,
    });
  } catch (error) {
    console.error("Error fetching letter templates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch letter templates",
      error: error.message,
    });
  }
};

// Get a single letter template by ID
exports.getLetterTemplateById = async (req, res) => {
  try {
    const template = await LetterTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Letter template not found",
      });
    }
    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error("Error fetching letter template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch letter template",
      error: error.message,
    });
  }
};

// Create a new letter template
exports.createLetterTemplate = async (req, res) => {
  try {
    const { name, content, fields, meta } = req.body;
    
    const newTemplate = await LetterTemplate.create({
      name,
      content,
      fields: fields || [],
      meta: meta || {
        includeHeader: true,
        includeFooter: true,
        includeBackground: false,
      },
    });

    res.status(201).json({
      success: true,
      message: "Letter template created successfully",
      data: newTemplate,
    });
  } catch (error) {
    console.error("Error creating letter template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create letter template",
      error: error.message,
    });
  }
};

// Update an existing letter template
exports.updateLetterTemplate = async (req, res) => {
  try {
    const { name, content, fields, meta } = req.body;
    
    const template = await LetterTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Letter template not found",
      });
    }

    await template.update({
      name,
      content,
      fields: fields || template.fields,
      meta: meta || template.meta,
    });

    res.status(200).json({
      success: true,
      message: "Letter template updated successfully",
      data: template,
    });
  } catch (error) {
    console.error("Error updating letter template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update letter template",
      error: error.message,
    });
  }
};

// Delete a letter template
exports.deleteLetterTemplate = async (req, res) => {
  try {
    const template = await LetterTemplate.findByPk(req.params.id);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Letter template not found",
      });
    }

    await template.destroy();

    res.status(200).json({
      success: true,
      message: "Letter template deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting letter template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete letter template",
      error: error.message,
    });
  }
};
