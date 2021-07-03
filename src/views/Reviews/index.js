import React, { useState, useEffect } from "react";
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
import reviews from '../../actions/apis/reviews/index';
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

function Reviews() {

  const [reviewsValues, setReviewsValues] = useState([]);
  const [reviewsHeaders, setReviewsHeaders] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await reviews.getAllReviews();
    const data = result?.data?.data;
    if(data?.length > 0){
      setReviewsHeaders(["Name", "Date", "Rating", "Comment", "Package", "User"]);
      const totalData = [];
      if(data.length > 0){
        data.forEach(item => {
          delete item.__v;
          delete item.createdAt;
          delete item.updatedAt;
          item.package = item.packageId.name;
          item.user = item.userId.firstName + " " + item.userId.lastName;
          delete item.packageId;
          delete item.userId;
          totalData.push(Object.values(item));
        })
        setReviewsValues(totalData);
      }
    }
  }

    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Reviews</h4>
                    <p className={classes.cardCategoryWhite}>
                        Reviews
                    </p>
                    <Button type="button" color="info" style={{float: 'right'}}>Add Review</Button>
                </CardHeader>
                <CardBody>
                  { promiseInProgress ? 
                        <div style={{ textAlign: "center", height: "100px", marginTop: '60px' }}>
                          <HashLoader color={"#9b33b2"} loading={true} size={50} />
                        </div>
                      : 
                      <Table
                        tableHeaderColor="primary"
                        tableHead={reviewsHeaders}
                        tableData={reviewsValues}
                      />
                  }
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

export default Reviews;
