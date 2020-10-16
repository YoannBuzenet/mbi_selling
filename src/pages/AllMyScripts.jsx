import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../super-responsive-table.css";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/authContext";
import Button from "@material-ui/core/Button";

const AllMyScripts = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

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

    launchButton: {
      backgroundColor: "rgb(247, 202, 24)",
      "&:hover": {
        background: "rgb(250, 216, 89)",
      },
    },
    seeButton: {
      backgroundColor: "rgb(149, 165, 166)",
      "&:hover": {
        background: "rgb(103, 128, 159)",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="container all-my-scripts">
      <h2>My Scripts</h2>
      <div>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {authenticationInfos.shop.userScripts.map((script) => {
              return (
                <>
                  <Tr>
                    <Td className="all-my-scripts-link-to-script">
                      <Link to={"/edit-script/" + script.id}>
                        {script.name}
                      </Link>
                    </Td>
                    <Td>
                      <Button
                        variant="contained"
                        color="primary"
                        className={"button-second-navbar " + classes.seeButton}
                        size="large"
                        onClick={(e) =>
                          history.push("/edit-script/" + script.id)
                        }
                      >
                        VOIR
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        variant="contained"
                        color="primary"
                        className={"button-second-navbar " + classes.testButton}
                        size="large"
                      >
                        TESTER
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        variant="contained"
                        color="primary"
                        className={
                          "button-second-navbar " + classes.launchButton
                        }
                        size="large"
                      >
                        LANCER
                      </Button>
                    </Td>
                    <Td>FORMATS</Td>
                  </Tr>
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
