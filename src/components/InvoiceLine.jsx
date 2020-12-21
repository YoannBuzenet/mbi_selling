import React from "react";
import { Tr, Td } from "react-super-responsive-table";

const InvoiceLine = ({ invoice }) => {
  return (
    <Tr>
      <Td>{invoice.createdAt}</Td>
      <Td>{invoice.subscribingStartDate}</Td>
      <Td>{invoice.subscribingEndDate}</Td>
      <Td>{invoice.amountTaxIncluded}</Td>
      <Td>{invoice.createdAt}</Td>
      <Td>{invoice.createdAt}</Td>
    </Tr>
  );
};

export default InvoiceLine;
