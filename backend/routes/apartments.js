const express = require('express');
const Apartment = require('../models/Apartment');
const router = express.Router();

// Get all apartments
router.get('/', async (req, res) => {
  const apartments = await Apartment.findAll();
  res.json(apartments);
});

// Get an apartment by ID
router.get('/:id', async (req, res) => {
  const apartment = await Apartment.findByPk(req.params.id);
  if (apartment) res.json(apartment);
  else res.json(null);
});


// Add a new apartment
// router.post('/', async (req, res) => {
//   const apartment = await Apartment.create(req.body);
//   res.status(201).json(apartment);
// });

const multer = require('multer');
const upload = multer();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, location, price, bedrooms, bathrooms, size } = req.body;

    const newApartment = await Apartment.create({
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      image: req.file.buffer, // Store image buffer
    });

    res.status(201).json(newApartment);
  } catch (error) {
    console.error('Error saving apartment:', error);
    res.status(500).json({ error: 'Failed to save apartment' });
  }
});

router.get('/:id/image', async (req, res) => {
  try {
    const apartment = await Apartment.findByPk(req.params.id);

    if (!apartment || !apartment.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.set('Content-Type', 'image/jpeg'); // Set the correct content type
    res.send(apartment.image); // Send the binary image data
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

// Update an apartment
router.put('/:id', async (req, res) => {
  const apartment = await Apartment.findByPk(req.params.id);
  if (apartment) {
    await apartment.update(req.body);
    res.json(apartment);
  } else res.status(404).json({ error: 'Apartment not found' });
});



module.exports = router;
