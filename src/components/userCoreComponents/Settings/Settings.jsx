import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";

const Settings = () => {
  const [shouldStateBeSaved, setShouldStateBeSaved] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    saveButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className="navbar-settings">
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => console.log(e)}
          className={"button-second-navbar " + classes.saveButton}
          size="large"
          disabled={!shouldStateBeSaved}
        >
          <FormattedMessage
            id="createMyScript.buttons.save"
            defaultMessage="Save"
          />
        </Button>
      </div>
      <div className="settings-container">Settings</div>
    </>
  );
};

export default Settings;
