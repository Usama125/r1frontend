import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { TextField } from '@material-ui/core';
import * as yup from 'yup';
import { useFormik } from 'formik';
import staffApi from "actions/apis/staff";
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';

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
  name: yup
    .string('Enter staff name')
    .required('name is required')
});

export default function AddStaff() {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if(id){
      loadSingleStaff();
    }
  }, []);

  const loadSingleStaff = () => {
    staffApi.getSingleStaff(id).then(res => {
      formik.setFieldValue("name", res.data.data.name);
    })
  }

  const formik = useFormik({
    initialValues: {
      name: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(id){
        staffApi.updateStaff(id, values).then(res => {
          toast.success("Staff updated successfully");
          history.push("/admin/staff")  
        })
      }else {
        staffApi.createStaff(values).then(res => {
          toast.success("Staff created successfully");
          history.push("/admin/staff")
        }).catch(err => {
          toast.error("Enable to create staff");
        })
      }
    },
  });
  const classes = useStyles();
  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Staff</h4>
              <p className={classes.cardCategoryWhite}>Package Staff</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <form onSubmit={formik.handleSubmit}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Staff Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <Button color="primary" variant="contained" style={{ float: 'right' }} type="submit">
                      Submit
                    </Button>
                    <Button onClick={() => { history.push('/admin/staff') }} color="secondary" variant="contained" style={{ float: 'right' }} type="button">
                      Back
                    </Button>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
  );
}
