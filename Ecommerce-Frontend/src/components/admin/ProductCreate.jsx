import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CONFIG } from "../../config/config";
const ProductCreate = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColour, setProductColour] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productImage, setProductImage] = useState("");
  const [Brands, setBrands] = useState([]);
  const [Category, setCategory] = useState([]);

  async function brand() {
    const data = await axios
      .get(`${CONFIG.BASE_URL}/brands`)
      .then((d) => d.data);
    // console.log(data.Brand);
    setBrands(data.Brand);
  }
  async function categ() {
    const data = await axios
      .get(`${CONFIG.BASE_URL}/category`)
      .then((d) => d.data);
    // console.log(data);
    setCategory(data.Category);
  }
  useEffect(() => {
    brand();
    categ();
  }, []);


async function handleProduct() {
  // Check required fields
  if (
    !productName.trim() ||
    !productDesc.trim() ||
    !productBrand ||
    !productCategory ||
    !productPrice ||
    !productColour ||
    !productQuantity
  ) {
    alert("Please fill all required fields and select Brand and Category.");
    return;
  }

  const product = {
    name: productName.trim(),
    description: productDesc.trim(),
    categoryId: [productCategory],
    brandId: productBrand,
    price: Number(productPrice),
    colour: productColour,
    quantity: Number(productQuantity),
    image_url: productImage,
  };

  try {
    console.log("Product data:", product);

    const response = await axios.post(
      `${CONFIG.BASE_URL}/products/create`,
      product
    );

    console.log("Product added:", response.data);
    alert("Product added successfully!");

    setProductBrand("");
    setProductCategory("");
    setProductName("");
    setProductDesc("");
    setProductPrice("");
    setProductColour("");
    setProductQuantity("");
    setProductImage("");
  } catch (error) {
    console.error(
      "Product error:",
      error.response?.data || error.message
    );
    alert("Product add nahi hua. Console mein error check karo.");
  }
}



  return (
    <div>
      <Box
        sx={{
          // display: "flex",
          margin: "auto",
          alignItems: "center",
          "& > :not(style)": { m: 1 },
          width: "40%",
        }}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            id="demo-helper-text-aligned"
            label="Product Name"
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="Product Description"
            onChange={(e) => setProductDesc(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productCategory}
              label="Category"
              onChange={(e) => setProductCategory(e.target.value)}
            >
              {Category?.map((elem) => (
                <MenuItem value={elem._id} key={elem._id}>
                  {elem.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productBrand}
              label="Brand"
              onChange={(e) => setProductBrand(e.target.value)}
            >
              {Brands?.map((elem) => (
                <MenuItem value={elem._id} key={elem._id}>
                  {elem.BrandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="demo-helper-text-aligned"
            label="Product Price"
            onChange={(e) => setProductPrice(e.target.value)}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="Product Image_URL"
            onChange={(e) => setProductImage(e.target.value)}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="Product Colour"
            onChange={(e) => setProductColour(e.target.value)}
          />
          
<TextField
  id="demo-helper-text-aligned"
  label="Product Quantity"
  type="number"
  value={productQuantity}
  onChange={(e) => setProductQuantity(e.target.value)}
  required
/>

        </Stack>
      </Box>
      <Button variant="contained" onClick={handleProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default ProductCreate;
