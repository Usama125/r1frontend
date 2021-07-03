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
import packagesApi from '../../actions/apis/packages';
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

function Packages() {

    const history = useHistory();
    const [packagesValues, setPackagesValues] = useState([]);
    const [packagesHeaders, setPackagesHeaders] = useState([]);
    const { promiseInProgress } = usePromiseTracker();

    useEffect(() => {
      fetchData();
    }, []);

    const deletePackageHandler = (id) => {
      packagesApi.deletePackage(id).then(res => {
        toast.success("Package deleted successfully");
        fetchData();
      }).catch(err => {
        toast.error("Problem delete the package");
      })
    }    

    const fetchData = async () => {
      const result = await packagesApi.getAllPackages();
      const data = result?.data?.data;
      if(data?.length > 0){
        setPackagesHeaders([...Object.keys(data[0]).filter(item => (item !== "_id" && item !== "__v" && item !== "categoryId" && item !== "imageUrl" && item !== "createdAt" && item !== "updatedAt")), ...["Edit", "Delete"]]);
        const totalData = [];
        if(data.length > 0){
          data.forEach(item => {
            delete item.__v;
            delete item.categoryId;
            delete item.imageUrl;
            delete item.createdAt;
            delete item.updatedAt;
            item.edit = <Button type="button" color="info" onClick={() => history.push(`/admin/editPackage/${item._id}`)}>Edit</Button>
            item.delete= <Button type="button" color="danger" onClick={deletePackageHandler.bind(this, item._id)}>Delete</Button>
            totalData.push(Object.values(item));
          })
          setPackagesValues(totalData);
        }
      }
    }

    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Packages</h4>
                    <p className={classes.cardCategoryWhite}>
                        Package
                    </p>
                    <Button type="button" color="info" style={{float: 'right'}} onClick={() => { history.push('/admin/addPackage') }}>Add Package</Button>
                </CardHeader>
                <CardBody>
                    { promiseInProgress ? 
                      <div style={{ textAlign: "center", height: "100px", marginTop: '60px' }}>
                        <HashLoader color={"#9b33b2"} loading={true} size={50} />
                      </div>
                    : 
                      <Table
                        tableHeaderColor="primary"
                        tableHead={packagesHeaders}
                        tableData={packagesValues}
                      />
                    }
                </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

export default Packages;
