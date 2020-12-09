import React from "react";
import { FormattedMessage } from "react-intl";

const ScriptStatusCalculator = ({ isScriptRunning, savingState }) => {
  let status;
  if (isScriptRunning === 1) {
    status = (
      <FormattedMessage
        id="scriptLine.buttons.isRunning"
        defaultMessage="Running"
      />
    );
    return;
  }

  switch (savingState) {
    case "saving": {
      status = (
        <FormattedMessage
          id="scriptLine.buttons.saving"
          defaultMessage="Saving..."
        />
      );
      break;
    }
    case "saved": {
      status = (
        <FormattedMessage
          id="scriptLine.buttons.saved"
          defaultMessage="Saved !"
        />
      );
      break;
    }
    default: {
      status = (
        <FormattedMessage
          id="scriptLine.buttons.upToDate"
          defaultMessage="Up to date"
        />
      );
      break;
    }
  }

  return <span>{status}</span>;
};

export default ScriptStatusCalculator;
