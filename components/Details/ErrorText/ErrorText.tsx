import { ErrorMessage } from "@hookform/error-message";
import React from "react";

const ErrorText = ({ errors, name }: { errors: object; name: string }) => {
  return (
    <div className="text-left h-4 flex items-center">
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="text-sm text-red-500 ml-3">{message}</p>
        )}
      />
    </div>
  );
};

export default ErrorText;
