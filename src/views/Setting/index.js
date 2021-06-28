import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";

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

const SettingLists = styled.ul`
    list-style-type: none;
`
const UnSelectedListItem = styled.li`
    background-color: lightgray;
    color: black;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
    
    &:hover {
        background-color: #00acc1;
        color: white;
    }
`
const SelectedListItem = styled.li`
    background-color: #00acc1;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 3px;
    cursor: pointer;
`

const ChangePasswordHeading = styled.h4`
    color: gray;
    font-weight: 200;
`

function Setting() {

    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Password Change</h4>
                            <p className={classes.cardCategoryWhite}>Change your password</p>
                        </CardHeader>
                        <CardBody>
                        <Grid container style={{padding: '10px'}}>
                            <Grid item xs={5} style={{ margin: '5px 0px', paddingTop: '15px', fontWeight: 'bold' }}>
                                <lable>Previous Password</lable>
                            </Grid>
                            <Grid item xs={6} style={{ margin: '5px 0px' }}>
                                <TextField id="outlined-basic" label="Previous Password" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={5} style={{ margin: '5px 0px', paddingTop: '15px', fontWeight: 'bold'  }}>
                                <lable>New Password</lable>
                            </Grid>
                            <Grid item xs={6} style={{ margin: '5px 0px' }}>
                                <TextField id="outlined-basic" label="New Password" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={5} style={{ margin: '5px 0px', paddingTop: '15px', fontWeight: 'bold'  }}>
                                <lable>Confirm Password</lable>
                            </Grid>
                            <Grid item xs={6} style={{ margin: '5px 0px' }}>
                                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={5} style={{ margin: '5px 0px', paddingTop: '15px', fontWeight: 'bold'  }}>
                            </Grid>
                            <Grid item xs={6} style={{ margin: '5px 0px' }}>
                                <Button type="button" color="success" style={{ float: 'right' }}>Change Password</Button>
                            </Grid>
                        </Grid>
                        </CardBody>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Setting
