import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

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
          <div>
            REGULAR
            <div>
              <Table className="settings-table regular">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Near-Mint</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Excellent</Td>
                    <Td>90%</Td>
                  </Tr>
                  <Tr>
                    <Td>Good</Td>
                    <Td>80%</Td>
                  </Tr>
                  <Tr>
                    <Td>Light-Played</Td>
                    <Td>70%</Td>
                  </Tr>
                  <Tr>
                    <Td>Played</Td>
                    <Td>60%</Td>
                  </Tr>
                  <Tr>
                    <Td>Poor</Td>
                    <Td>50%</Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            FOIL
            <div>
              <Table className="settings-table foil">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Near-Mint</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Excellent</Td>
                    <Td>90%</Td>
                  </Tr>
                  <Tr>
                    <Td>Good</Td>
                    <Td>80%</Td>
                  </Tr>
                  <Tr>
                    <Td>Light-Played</Td>
                    <Td>70%</Td>
                  </Tr>
                  <Tr>
                    <Td>Played</Td>
                    <Td>60%</Td>
                  </Tr>
                  <Tr>
                    <Td>Poor</Td>
                    <Td>50%</Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            LANGUE
            <div>
              <Table className="settings-table language">
                <Thead>
                  <Tr>
                    <Th>Language</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>German</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Spanish</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>French</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Italian</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Japanese</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Portuguese(Brazil)</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Russian</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Chinese Simplified</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>English</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Korean</Td>
                    <Td>100%</Td>
                  </Tr>
                  <Tr>
                    <Td>Chinese Traditional</Td>
                    <Td>100%</Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
