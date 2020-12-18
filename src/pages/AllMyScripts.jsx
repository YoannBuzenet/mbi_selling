import React, { useContext } from "react";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "../super-responsive-table.css";
import AuthContext from "../context/authContext";
import AllDefinitionsContext from "../context/definitionsContext";
import ScriptLine from "../components/ScriptLine";
import { FormattedMessage } from "react-intl";

const AllMyScripts = ({ history }) => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log("current auth context", authenticationInfos);

  const { allDefinitions } = useContext(AllDefinitionsContext);

  console.log("definitions", allDefinitions);

  return (
    <div className="container all-my-scripts">
      <h2>
        <FormattedMessage id="allMyScripts.title" defaultMessage="My Scripts" />
      </h2>
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
