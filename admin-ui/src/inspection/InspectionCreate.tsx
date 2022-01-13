import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  DateInput,
  TextInput,
} from "react-admin";

export const InspectionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateInput label="CompletedDate" source="completedDate" />
        <DateInput label="PlannedDate" source="plannedDate" />
        <TextInput label="Title" source="title" />
      </SimpleForm>
    </Create>
  );
};
