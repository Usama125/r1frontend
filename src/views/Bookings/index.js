import React, { useEffect, useState } from "react";
// react plugin for creating charts

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import bookingsApi from '../../actions/apis/bookings';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { usePromiseTracker } from "react-promise-tracker";
import HashLoader from "react-spinners/HashLoader";


const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };

const useStyles = makeStyles(styles);

function Bookings() {
  const history = useHistory();
  const [bookingsValues, setBookingsValues] = useState([]);
  const [bookingsHeaders, setBookingsHeaders] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await bookingsApi.getAllBookings();
    const data = result?.data?.data;
    if(data?.length > 0){
      setBookingsHeaders(["User", "Package", "Staff", "Admin Fee", "Sub Total", "Total Cost", "View Booking"]);
      const totalData = [];
      if(data.length > 0){
        data.forEach(item => {
          const newItem = ["", item.userId.firstName + item.userId.lastName, item.packageId.name, item.staffId.name, item.adminFee, item.subtotal, item.totalCost, <Button type="button" color="info" onClick={() => history.push(`/admin/viewDetails/${item._id}`)}>View Details</Button>];
          totalData.push(newItem);
        })
        setBookingsValues(totalData);
      }
    }
  }

    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Bookings</h4>
                    <p className={classes.cardCategoryWhite}>
                        Bookings List
                    </p>
                </CardHeader>
                <CardBody>
                { promiseInProgress ? 
                      <div style={{ textAlign: "center", height: "100px", marginTop: '60px' }}>
                        <HashLoader color={"#9b33b2"} loading={true} size={50} />
                      </div>
                    : 
                      <Table
                        tableHeaderColor="primary"
                        tableHead={bookingsHeaders}
                        tableData={bookingsValues}
                      />
                    }
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

export default Bookings;
