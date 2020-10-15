import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import React from "react";

function checkErrorStatus(error) {
  if (error.response) {
    console.log(error.response);
    if (error.response.status === 401) {
      toast.error(
        <FormattedMessage
          id="app.error401.toast.failure"
          defaultMessage={`You are not logged anymore. Please log again.`}
        />
      );
      return true;
    } else if (error.response.status === 403) {
      toast.error(
        <FormattedMessage
          id="app.error403.toast.failure"
          defaultMessage={`You don't have access to this ressource.`}
        />
      );
      return true;
    }
  } else if (error.response.status === 500) {
    toast.error(
      <FormattedMessage
        id="app.error500.toast.failure"
        defaultMessage={`There has been an error. Please try again later.`}
      />
    );
    return true;
  }

  return false;
}

export default { checkErrorStatus };
