import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../super-responsive-table.css";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/authContext";
import AllDefinitionsContext from "../context/definitionsContext";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";

const AllMyScripts = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const { allDefinitions } = useContext(AllDefinitionsContext);

  console.log("definitions", allDefinitions);

  const handleChangeSelect = (event) => {
    console.log(event);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [selectedFormats, setSelectedFormats] = useState([]);

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
      width: "82px",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
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
                        className={classes.seeButton}
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
                        className={classes.testButton}
                        size="large"
                      >
                        TESTER
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.launchButton}
                        size="large"
                      >
                        LANCER
                      </Button>
                    </Td>
                    <Td>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-checkbox-label">
                          Tag
                        </InputLabel>
                        <Select
                          labelId="demo-mutiple-checkbox-label"
                          id="demo-mutiple-checkbox"
                          multiple
                          value={[]}
                          onChange={handleChangeSelect}
                          input={<Input />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {allDefinitions.allFormats.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox
                                checked={selectedFormats.indexOf(name) > -1}
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Td>
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
