import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "../super-responsive-table.css";

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
      <div className="settings-container">
        <header>
          <h1>Manage your prices</h1>
          Quelle décôte voulez-vous appliquer en fonction des différents états
          des cartes et de leur langue ?
        </header>
        <div>
          REGULAR
          <div>
            <Table>
              <Thead>
                <Th>Condition</Th>
                <Th>Percentage To Apply</Th>
              </Thead>
              <Tbody>
                <Td></Td>
              </Tbody>
            </Table>
          </div>
        </div>
        <div>
          FOIL
          <div>
            <Table>
              <Thead>
                <Th>Condition</Th>
                <Th>Percentage To Apply</Th>
              </Thead>
              <Tbody>
                <Td></Td>
              </Tbody>
            </Table>
          </div>
        </div>
        <div>
          LANGUE
          <div>
            <Table>
              <Thead>
                <Th>Language</Th>
                <Th>Percentage To Apply</Th>
              </Thead>
              <Tbody>
                <Td></Td>
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
