import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

import AuthContext from "../context/authContext";

const AllMyScripts = () => {
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  return (
    <div className="container all-my-scripts">
      <h2>My Scripts</h2>
      <div>
        <Table>
          <Thead>
            <Th></Th>
          </Thead>
          <Tbody>
            {authenticationInfos.shop.userScripts.map((script) => (
              <Tr>
                <Td>
                  <Link to={"/edit-script/" + script.id}>{script.name}</Link>
                </Td>
                <Td>Tester</Td>
                <Td>Lancer</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllMyScripts;
