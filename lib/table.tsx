const columns = [
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: (props) => <p>{props.getValue()}</p>,
    isResizable: true,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: (props) => <p>{props.getValue()}</p>,
    isResizable: true,
    
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: (props) => <p>{props.getValue()}</p>,
    isResizable: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (props) => <p>{props.getValue()}</p>,
    isResizable: true,
  },
];

export default columns;
