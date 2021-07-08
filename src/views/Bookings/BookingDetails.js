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
import bookingsApi from "actions/apis/bookings";

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

export default function BookingDetails() {
  const { promiseInProgress } = usePromiseTracker();
  const history = useHistory();
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  
  useEffect(() => {
    loadSingleBooking();
  }, []);

  const loadSingleBooking = () => {
    bookingsApi.getSingleBooking(id).then(res => {
        setBookingDetails(res.data.data);
    })
  }

  const classes = useStyles();

  return (
    <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Booking Details</h4>
            </CardHeader>
            <CardBody>
            { promiseInProgress ? 
                      <div style={{ textAlign: "center", height: "100px", marginTop: '60px' }}>
                        <HashLoader color={"#9b33b2"} loading={true} size={50} />
                      </div>
                    : 
                  <>
                    <h4 style={{fontWeight: "bold", textAlign: 'center', textDecoration: 'underline'}}>Booking Information</h4>
                    <Grid container>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Package Name:  </strong> {bookingDetails?.packageId?.name}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> User Name:  </strong> {bookingDetails?.userId?.firstName + " " + bookingDetails?.userId?.lastName }
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> User email:  </strong> {bookingDetails?.userId?.email}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Admin Fee:  </strong> {bookingDetails?.adminFee}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Sub Total:  </strong> {bookingDetails?.subtotal}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Total Cost:  </strong> {bookingDetails?.totalCost}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> User email:  </strong> {bookingDetails?.userId?.email}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Date:  </strong> {bookingDetails?.selectedDate}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Time:  </strong> {bookingDetails?.selectedTime}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Status:  </strong> {bookingDetails?.status}
                        </Grid>
                    </Grid>

                    <h4 style={{fontWeight: "bold", textAlign: 'center', textDecoration: 'underline'}}>Additional Information</h4>
                    <Grid container>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Additional Information:  </strong> {bookingDetails?.additionalInformation?.additionalInfo}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Complete address with 4 corners:  </strong> {bookingDetails?.additionalInformation?.completeAddressWith4Corners}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Tire Size:  </strong> {bookingDetails?.additionalInformation?.tireSize}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Tires:  </strong> {bookingDetails?.additionalInformation?.tires}
                        </Grid>
                    </Grid>

                    <h4 style={{fontWeight: "bold", textAlign: 'center', textDecoration: 'underline'}}>Booking User Information</h4>
                    <Grid container>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Addrees 1:  </strong> {bookingDetails?.bookingUserInformation?.address?.address1}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Addrees 2:  </strong> {bookingDetails?.bookingUserInformation?.address?.address2}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> City:  </strong> {bookingDetails?.bookingUserInformation?.address?.city}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Postal Code:  </strong> {bookingDetails?.bookingUserInformation?.address?.postalCode}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Email Address:  </strong> {bookingDetails?.bookingUserInformation?.emailAddress}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> First Name:  </strong> {bookingDetails?.bookingUserInformation?.firstName}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Last Name:  </strong> {bookingDetails?.bookingUserInformation?.lastName}
                        </Grid>
                        <Grid item xs={4} sm={4} lg={4}>
                            <strong> Phone Number:  </strong> {bookingDetails?.bookingUserInformation?.phoneNumber}
                        </Grid>
                    </Grid>

                    <h4 style={{fontWeight: "bold", textAlign: 'center', textDecoration: 'underline'}}>Booking Images</h4>
                    <Grid container>
                        {bookingDetails?.images?.map(item => (
                            <Grid item xs={4} sm={4} lg={4}>
                                <img style={{ float: 'left', width: '280px', height: '250px', objectFit: 'cover' }} src={item} />
                            </Grid>
                        ))}
                    </Grid>

                    <Button style={{float: 'right'}} onClick={() => { history.push('/admin/bookings') }} color="secondary" variant="contained" style={{ float: 'right' }} type="button">
                      Back
                    </Button>
                  </>
            }
            </CardBody>
          </Card>
        </Grid>
      </Grid>
  );
}
