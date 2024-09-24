const { Company } = require("../models/company.model");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(411).json({
        mesage: "Company name required",
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(411).json({
        message: "Company already exists",
      });
    }

    await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(200).json({
      message: "Company created",
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.findOne({ userId });
    res.json({
      company: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res.status(411).json({
        message: "Company not found",
      });
    }
    return res.status(200).json({
      message: "Company found",
      company,
    });
  } catch (error) {}
};

const updateCompany = async (req, res) => {
  try {
    const { companyName, description, location, website } = req.body;
    const file = req.file;

    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(411).json({
        message: "Company not found",
      });
    }

    return res.status(200).json({
      mesage: "Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
};
