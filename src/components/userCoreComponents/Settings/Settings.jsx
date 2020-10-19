import React, { useState } from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import { FormattedMessage, useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import TextField from "@material-ui/core/TextField";

const Settings = () => {
  const [shouldStateBeSaved, setShouldStateBeSaved] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
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
            <h2>REGULAR</h2>
            <div>
              <Table className="settings-table regular zebra-table">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Near-Mint</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excellent</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Good</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Light-Played</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Played</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Poor</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            <h2>FOIL</h2>
            <div>
              <Table className="settings-table foil zebra-table">
                <Thead>
                  <Tr>
                    <Th>Condition</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Mint</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Near-Mint</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Excellent</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Good</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Light-Played</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Played</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Poor</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
          <div>
            <h2>LANGUE</h2>
            <div>
              <Table className="settings-table language zebra-table">
                <Thead>
                  <Tr>
                    <Th>Language</Th>
                    <Th>Percentage To Apply</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>German</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Spanish</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>French</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Italian</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Japanese</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Portuguese(Brazil)</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Russian</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Chinese Simplified</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>English</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Korean</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Chinese Traditional</Td>
                    <Td>
                      <TextField
                        className="input-percents"
                        id="filled-required"
                        variant="outlined"
                      />
                      %
                    </Td>
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
