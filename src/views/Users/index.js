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
import usersApi from "actions/apis/users";
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

function Users() {

  const [usersValues, setUsersValues] = useState([]);
  const [usersHeaders, setUsersHeaders] = useState([]);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUserHandler = (id) => {
    usersApi.deleteUser(id).then(res => {
      toast.success("User deleted successfully");
      fetchData();
    }).catch(err => {
      toast.error("Problem delete the user");
    })
  }

  const fetchData = async () => {
    const result = await usersApi.getAllUsers();
    const data = result?.data?.data;
    if(data?.length > 0){
      setUsersHeaders(["Email", "First Name", "Last Name", "Delete"]);
      const totalData = [];
      if(data.length > 0){
        data.forEach(item => {
          delete item.__v;
          delete item.createdAt;
          delete item.updatedAt;
          delete item.address;
          item.delete= <Button type="button" color="danger" onClick={deleteUserHandler.bind(this, item._id)}>Delete</Button>
          totalData.push(Object.values(item));
        })
        setUsersValues(totalData);
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
                      Users
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
                      tableHead={usersHeaders}
                      tableData={usersValues}
                    />
                }
              </CardBody>
              </Card>
          </GridItem>
      </GridContainer>
    )
}

export default Users;
