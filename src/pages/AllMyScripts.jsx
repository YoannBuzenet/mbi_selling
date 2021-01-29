import React, { useContext } from "react";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "../super-responsive-table.css";
import AuthContext from "../context/authContext";
import AllDefinitionsContext from "../context/definitionsContext";
import PopInLaunchingConfirmationContext from "../context/popInConfirmationLaunchingScript";
import ScriptLine from "../components/ScriptLine";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const AllMyScripts = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log("current auth context", authenticationInfos);

  const { allDefinitions } = useContext(AllDefinitionsContext);

  const { setIsPopInDisplayed } = useContext(PopInLaunchingConfirmationContext);

  console.log("definitions", allDefinitions);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    createScriptButton: {
      backgroundColor: "rgb(0, 177, 106)",
      "&:hover": {
        background: "rgb(123, 239, 178)",
      },
      width: "182px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },

    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  return (
    <div className="container all-my-scripts">
      <h2>
        <FormattedMessage id="allMyScripts.title" defaultMessage="My Scripts" />
      </h2>
      <div className="createScriptButton marginHeight20px">
        <Button
          variant="contained"
          color="primary"
          className={classes.createScriptButton}
          size="large"
          onClick={(e) => history.push("/create-script")}
        >
          <FormattedMessage
            id="allMyScripts.button.createScript"
            defaultMessage="Create a Script"
          />
        </Button>
      </div>
      <div>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th>
                <FormattedMessage
                  id="allMyScripts.formats"
                  defaultMessage="Formats"
                />
              </Th>
              <Th>
                <FormattedMessage
                  id="allMyScripts.status"
                  defaultMessage="Status"
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {authenticationInfos.userScripts.map((script, index) => {
              return (
                <>
                  <ScriptLine script={script} history={history} index={index} />
                </>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllMyScripts;
