import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { TextField, Grid, MenuItem, Select } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import categoriesApi from "actions/apis/categories";
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import packagesApi from "actions/apis/packages";
import { usePromiseTracker } from "react-promise-tracker";
import HashLoader from "react-spinners/HashLoader";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const validationSchema = yup.object({
  name: yup.string('Enter package name').required('Name is required'),
  description: yup.string('Enter package description').required('Description is required'),
  features: yup.string('Enter package feature').required('Features are required'),
  price: yup.string('Enter package price').required('Price is required'),
  duration: yup.string('Enter package duration').required('Duration is required'),
  long: yup.string('Enter package long').required('Longitude is required'),
  lat: yup.string('Enter package lat').required('latitude is required'),
  categoryId: yup.string('Enter package categoryId').required('Category is required')
});

export default function AddPackage() {
  const { promiseInProgress } = usePromiseTracker();
  const history = useHistory();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [checkNewImageUploadedInEdit, setCheckNewImageUploadedInEdit] = useState(false);

  useEffect(() => {
    if(id){
      loadSinglePackage();
    }
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const result = await categoriesApi.getAllCategories();
    setCategoriesList(result?.data?.data);
  }

  const loadSinglePackage = () => {
    packagesApi.getSinglePackage(id).then(res => {
      formik.setFieldValue("name", res.data.data.name);
      formik.setFieldValue("description", res.data.data.description);
      formik.setFieldValue("price", res.data.data.price);
      formik.setFieldValue("long", res.data.data.long);
      formik.setFieldValue("lat", res.data.data.lat);
      formik.setFieldValue("features", res.data.data.features);
      formik.setFieldValue("duration", res.data.data.duration);
      formik.setFieldValue("categoryId", res.data.data.categoryId);
      setImageUrl(res.data.data.imageUrl);
    })
  }

  const onFileChange = (e) => {
    setImageUrl(e.target.files[0]);
    setCheckNewImageUploadedInEdit(true);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      features: "",
      price: "",
      duration: "",
      long: "",
      lat: "",
      categoryId: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(id){
        packagesApi.updatePackage(id, values).then(res => {
            toast.success("Package updated successfully");
            formik.resetForm();
            history.push("/admin/packages");  
        }).catch(err => {
            toast.error("Unable to create package");
        });
        return false;
      }else {
        const formData = new FormData();
        formData.append('imageUrl', imageUrl);
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("features", values.features);
        formData.append("lat", values.lat);
        formData.append("long", values.long);
        formData.append("duration", values.duration);
        formData.append("categoryId", values.categoryId);

        packagesApi.createPackage(formData).then(res => {
            toast.success("Package created successfully");
            formik.resetForm();
            history.push("/admin/packages");  
        }).catch(err => {
            toast.error("Unable to create package");
        });
      }
    },
  });
  const classes = useStyles();
  return (
    <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Package</h4>
              <p className={classes.cardCategoryWhite}>Packages</p>
            </CardHeader>
            <CardBody>
            { promiseInProgress ? 
                      <div style={{ textAlign: "center", height: "100px", marginTop: '60px' }}>
                        <HashLoader color={"#9b33b2"} loading={true} size={50} />
                      </div>
                    : 
                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="price"
                                name="price"
                                label="Price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                                helperText={formik.touched.price && formik.errors.price}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="duration"
                                name="duration"
                                label="Duration"
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                error={formik.touched.duration && Boolean(formik.errors.duration)}
                                helperText={formik.touched.duration && formik.errors.duration}
                            />
                        </Grid>       
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="long"
                                name="long"
                                label="Longitude"
                                value={formik.values.long}
                                onChange={formik.handleChange}
                                error={formik.touched.long && Boolean(formik.errors.long)}
                                helperText={formik.touched.long && formik.errors.long}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="lat"
                                name="lat"
                                label="Latitude"
                                value={formik.values.lat}
                                onChange={formik.handleChange}
                                error={formik.touched.lat && Boolean(formik.errors.lat)}
                                helperText={formik.touched.lat && formik.errors.lat}
                            />
                        </Grid>  
                        <Grid item xs={4}>
                          <Select
                            fullWidth
                            placeholder="Select Category"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="categoryId"
                            onChange={formik.handleChange}
                            value={formik.values.categoryId}
                            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                            helperText={formik.touched.categoryId && formik.errors.categoryId}
                          >
                            {categoriesList.map((item, index) => (
                              <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        {!id && (
                          <Grid item xs={4}>
                              <input
                                  id="imageUrl"
                                  type="file"
                                  name="imageUrl"
                                  onChange={onFileChange}
                              />
                              <img src={imageUrl} style={{ width: "50px" }} />
                          </Grid>
                        )}
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="features"
                                name="features"
                                label="Features"
                                value={formik.values.features}
                                onChange={formik.handleChange}
                                error={formik.touched.features && Boolean(formik.errors.features)}
                                helperText={formik.touched.features && formik.errors.features}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                id="description"
                                name="description"
                                label="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                        </Grid>               
                    </Grid>
                  <Button color="primary" variant="contained" style={{ float: 'right' }} type="submit">
                      Submit
                  </Button>
                  <Button onClick={() => { history.push('/admin/packages') }} color="secondary" variant="contained" style={{ float: 'right' }} type="button">
                      Back
                  </Button>
                  </form>
            }
            </CardBody>
          </Card>
        </Grid>
      </Grid>
  );
}
