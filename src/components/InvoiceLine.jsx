import React from "react";
import { Tr, Td } from "react-super-responsive-table";
import { FormattedDate } from "react-intl";

const InvoiceLine = ({ invoice }) => {
  return (
    <Tr>
      <Td>
        <FormattedDate
          value={invoice.createdAt.substring(0, invoice.createdAt.length - 14)}
        />
      </Td>
      <Td>
        <FormattedDate value={invoice.subscribingStartDate} />
      </Td>
      <Td>
        <FormattedDate value={invoice.subscribingEndDate} />
      </Td>
      <Td>{invoice.amountTaxIncluded}</Td>
    </Tr>
  );
};

export default InvoiceLine;
