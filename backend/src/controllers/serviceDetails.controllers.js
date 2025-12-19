
import ServiceDetails from "../models/serviceDetails.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const createService = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      checklist,
      priceRange,
      duration,
      longDescription,
      highlights,
      category,
      slug,
      order,
    } = req.body;

    /* ---------- VALIDATION ---------- */
    if (!req.files || !req.files.images) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const slugExists = await ServiceDetails.findOne({ slug });
    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    /* ---------- NORMALIZE DATA ---------- */
    const checklistArray =
      typeof checklist === "string" ? JSON.parse(checklist) : checklist;

    const highlightsArray =
      typeof highlights === "string" ? JSON.parse(highlights) : highlights;

    /* ---------- IMAGE UPLOAD ---------- */
    const uploadedImages = [];
    for (const file of req.files.images) {
      const uploaded = await uploadOnCloudinary(file.path);
      uploadedImages.push(uploaded.secure_url);
    }

    /* ---------- CREATE DOCUMENT ---------- */
    const serviceDetails = await ServiceDetails.create({
      title,
      shortDescription,
      checklist: checklistArray,
      priceRange,
      duration,
      longDescription,
      highlights: highlightsArray || [],
      images: uploadedImages,
      category,
      slug,
      order,
    });

    res.status(201).json({
      success: true,
      message: "Service Details created successfully",
      service: serviceDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllServices = async (req, res) => {
    try {
      const filter = {};
      if (req.query.category) filter.category = req.query.category;
  
      const services = await ServiceDetails.find(filter)
        .sort({ order: 1 })
        .select(
          "title shortDescription checklist priceRange duration slug category images order"
        );
  
      res.status(200).json({
        success: true,
        count: services.length,
        services,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to fetch services",
      });
    }
  };
  


  export const getServiceBySlug = async (req, res) => {
    try {
      const service = await ServiceDetails.findOne({
        slug: req.params.slug,
      });
  
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        success: true,
        service,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: "Failed to fetch service details",
      });
    }
  };
  
  export const updateService = async (req, res) => {
    try {
      const service = await ServiceDetails.findById(req.params.id);
  
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
  
      const {
        title,
        shortDescription,
        checklist,
        priceRange,
        duration,
        longDescription,
        highlights,
        category,
        slug,
        order,
      } = req.body;
  
      /* ---------- SLUG CHECK ---------- */
      if (slug && slug !== service.slug) {
        const slugExists = await ServiceDetails.findOne({ slug });
        if (slugExists) {
          return res.status(400).json({
            success: false,
            message: "Slug already exists",
          });
        }
        service.slug = slug;
      }
  
      /* ---------- NORMALIZE ARRAYS ---------- */
      if (checklist) {
        service.checklist =
          typeof checklist === "string" ? JSON.parse(checklist) : checklist;
      }
  
      if (highlights) {
        service.highlights =
          typeof highlights === "string" ? JSON.parse(highlights) : highlights;
      }
  
      /* ---------- IMAGE UPDATE (OPTIONAL) ---------- */
      if (req.files?.images?.length) {
        const uploadedImages = [];
        for (const file of req.files.images) {
          const uploaded = await uploadOnCloudinary(file.path);
          uploadedImages.push(uploaded.secure_url);
        }
        service.images = uploadedImages;
      }
  
      /* ---------- UPDATE FIELDS ---------- */
      if (title) service.title = title;
      if (shortDescription) service.shortDescription = shortDescription;
      if (priceRange) service.priceRange = priceRange;
      if (duration) service.duration = duration;
      if (longDescription) service.longDescription = longDescription;
      if (category) service.category = category;
      if (order !== undefined) service.order = order;
  
      await service.save();
  
      res.status(200).json({
        success: true,
        message: "Service updated successfully",
        service,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  


export const deleteService = async (req, res) => {
    try {
      const service = await ServiceDetails.findById(req.params.id);
  
      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }
  
      await service.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
        deletedServiceId: service._id,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete service",
      });
    }
};


export const getCosmetologyServices = async (req, res) => {
  try {
    const services = await ServiceDetails.find({
      category: "Cosmetology",
    })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Fetch cosmetology services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cosmetology services",
    });
  }
};


export const getMedicalServices = async (req, res) => {
  try {
    const services = await ServiceDetails.find({
      category: "Medical",
    })
      .sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Fetch medical services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch medical services",
    });
  }
};

  
