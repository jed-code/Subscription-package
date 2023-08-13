import React, { useState } from "react";
import { makeStyles } from "@material/styles";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down("xs")]: { padding: theme.spacing(2) },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "none",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    padding: theme.spacing(2),
    textAlign: "center",
    borderRadius: "10px 10px 0 0",
  },

  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    width: "100%",
    margin: theme.spacing(2, 0),
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  textField: {
    margin: theme.spacing(1),
  },
}));

const SubscriptionPage = () => {
  const classes = useStyles();

  const [features, setFeatures] = useState({
    workouts: false,
    nutrition: false,
    support: false,
  });

  const handleFeaturesChange = (event) => {
    const { name, checked } = event.target;
    setFeatures({ ...features, [name]: checked });
  };

  const calculatePrice = () => {
    let basePrice = 9.99;
    if (features.nutrition) {
      basePrice += 5;
    }
    if (features.workouts) {
      basePrice += 10;
    }
    if (features.support) {
      basePrice += 5;
    }
    return basePrice;
  };

  const [customPrice, setCustomPrice] = useState("");

  const handleCustomPriceChange = (event) => {
    const { value } = event.target;
    setCustomPrice(value);
  };

  const handleCustomPriceSubmit = (event) => {
    event.preventDefault();
    if (customPrice !== "" && !isNaN(customPrice)) {
      setCustomPrice("");
    }
  };

  return (
    <div className={classes.root}>
      {" "}
      <Grid container spacing={3}>
        {" "}
        <Grid item xs={12} sm={4}>
          {" "}
          <Card className={classes.card}>
            {" "}
            <CardHeader title="Basic" className={classes.header} />
            <CardContent>
              <Typography variant="h4">
                $
                {customPrice !== "" ? customPrice : calculatePrice().toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">/ month</Typography>
              <Typography variant="body1">
                Access to exclusive workouts and personalized training plans
              </Typography>
              <Typography variant="body1">
                Limited nutrition guidance
              </Typography>
            </CardContent>
            <div>
              <TextField
                className={classes.textField}
                label="Add Nutrition Guidance"
                name="nutrition"
                type="checkbox"
                checked={features.nutrition}
                onChange={handleFeaturesChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$5</InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" className={classes.button}>
                Subscribe Now
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardHeader title="Custom" className={classes.header} />

            <CardContent>
              <Typography variant="h4">
                ${customPrice !== "" ? customPrice : "???"}
              </Typography>

              <Typography variant="subtitle1">/ month</Typography>

              <Typography variant="body1">
                Build your own subscription package
              </Typography>

              <form onSubmit={handleCustomPriceSubmit}>
                <TextField
                  className={classes.textField}
                  label="Enter your price"
                  name="customPrice"
                  value={customPrice}
                  onChange={handleCustomPriceChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                >
              
                  Subscribe Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubscriptionPage;
