import React, { useContext, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "../super-responsive-table.css";
import AuthContext from "../context/authContext";
import AllDefinitionsContext from "../context/definitionsContext";
import TutorialContext from "../context/tutorialContext";
import { FormattedMessage } from "react-intl";
import ScriptLine from "../components/ScriptLine";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";

const AllMyScripts = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const { tutorialContext, setTutorialContext } = useContext(TutorialContext);

  console.log("current auth context", authenticationInfos);
  console.log("current tutorialContext context", tutorialContext);
  console.log(
    "check if trigger",
    authenticationInfos?.shopLocalData?.hasAlreadyLogged === 0 &&
      tutorialContext?.hadAllMyScriptsMessage !== 1
  );

  const { allDefinitions } = useContext(AllDefinitionsContext);

  useEffect(() => {
    if (
      authenticationInfos?.shopLocalData?.hasAlreadyLogged === 0 &&
      tutorialContext?.hadAllMyScriptsMessage !== 1
    ) {
      toast.info(
        <FormattedMessage
          id="tutorial.allMyScripts"
          defaultMessage="All your scripts are available here. We created some for you to check. You can edit them as you like."
        />,
        { autoClose: false }
      );
      setTutorialContext({ ...tutorialContext, hadAllMyScriptsMessage: 1 });
    }
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    createScriptButton: {
      backgroundColor: "rgb(28, 100, 242)",
      textTransform: "none",
      paddingLeft: "3rem",
      paddingRight: "3rem",
      paddingTop: "1rem",
      paddingBottom: "1rem",
      fontSize: "1.7rem",
      fontWeight: "500",
      border: "1px solid transparent",
      color: "rgb(255, 255, 255)",
      cursor: "pointer",
      borderRadius: "6px",
      textDecoration: "none",
      "&:hover": {
        background: "rgba(63, 131, 248, 0.8)",
        transition: "background-color 0.5s",
      },
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
              {/* <Th>
                <FormattedMessage
                  id="allMyScripts.formats"
                  defaultMessage="Formats"
                />
              </Th> */}
              <Th>
                <FormattedMessage
                  id="allMyScripts.status"
                  defaultMessage="Status"
                />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(authenticationInfos?.userScripts) &&
              authenticationInfos.userScripts.map((script, index) => {
                return (
                  <>
                    <ScriptLine
                      script={script}
                      history={history}
                      index={index}
                    />
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
