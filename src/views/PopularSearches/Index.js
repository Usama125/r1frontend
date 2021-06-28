import React from "react";
// react plugin for creating charts

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

function PopularSearches() {
    const classes = useStyles();
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Popular Searches</h4>
                    <p className={classes.cardCategoryWhite}>
                        Popular Searches of September, 2016
                    </p>
                    </CardHeader>
                    <CardBody>
                    <Table
                        tableHeaderColor="warning"
                        tableHead={[ "Sr.", "Search" ]}
                        tableData={[
                            ["1", "Pakistan VS South Africa"],
                            ["2", "Minar e Pakistan"],
                            ["3", "Sage Rodriguez"],
                            ["4", "Philip Chaney"]
                        ]}
                    />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    )
}

export default PopularSearches
