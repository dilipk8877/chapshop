export const COLUMNS = [
  {
    Header: "Category Name",
    accessor: "name",
  },
  {
    Header: "Sizes",
    accessor: "phone",
  },
  {
    Header: "Action",
    accessor: "action",
    disableSortBy: true,
    Cell: (tableProps) => {
      return (
        <>
          <button className="category-edit-btn">Edit</button>{" "}
          <button className="category-edit-delete">Delete</button>
        </>
      );
    },
  },
];

export const PRODUCT_COLUMNS = [
  {
    Header: "Product",
    accessor: "name",
  },
  {
    Header: "Category",
    accessor: "category",
  },
  {
    Header: "SKU",
    accessor: "sku",
  },
  {
    Header: "Buying Price",
    accessor: "buyingPrice",
  },
  {
    Header: "Reselling Price",
    accessor: "resellingPrice",
  },
  {
    Header: "Public",
    accessor: "public",
  },

  {
    Header: "Action",
    accessor: "action",
    disableSortBy: true,
    Cell: () => {
      return (
        <>
          <button className="category-edit-btn">Edit</button>{" "}
          <button className="category-edit-delete">Delete</button>
        </>
      );
    },
  },
];
