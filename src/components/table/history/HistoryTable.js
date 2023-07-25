import { EnhancedTable } from "../base/EnhancedTable";
import useOperationsApi from "../../../hooks/useOperationsApi";
import { useEffect, useState } from "react";
import { baseApiUrl } from "../../../axios/CalculatorApi";
import { PREV_PAGE } from "../base/EnhancedTablePaginator";

const DEFAULT_PAGE_NUMBER = 1;
const PAGE_SIZE = 10;
const TITLE = "Operations History";
const ORDER_BY_COLUMN = "dateTime";

const historyFilterConfig = [
  {
    display: "Operation Type",
    filterFieldName: "operationType",
    filterValue: "",
    values: [
      "ADDITION",
      "SUBTRACTION",
      "MULTIPLICATION",
      "DIVISION",
      "SQUARE_ROOT",
      "RANDOM_STRING",
    ],
  },
];

const historyTableHeaders = [
  {
    id: "operationId",
    numeric: false,
    disablePadding: true,
    label: "Operation Id",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "Cost",
  },
  {
    id: "userBalance",
    numeric: false,
    disablePadding: false,
    label: "User Balance",
  },
  {
    id: "operationType",
    numeric: true,
    disablePadding: false,
    label: "Operation Type",
  },
  {
    id: "operationState",
    numeric: true,
    disablePadding: false,
    label: "Operation Status",
  },
  {
    id: "dateTime",
    numeric: true,
    disablePadding: false,
    label: "Operation Date",
  },
];

export const HistoryTable = () => {
  const operationsService = useOperationsApi();
  const [response, setResponse] = useState({ records: [] });

  useEffect(() => {
    operationsService
      .getRecords(undefined, DEFAULT_PAGE_NUMBER, PAGE_SIZE)
      .then((r) => {
        setResponse(r);
      });
  }, []);

  const handleAppliedFilter = async (additionalQueryParams) => {
    operationsService
      .getRecords(
        undefined,
        DEFAULT_PAGE_NUMBER,
        PAGE_SIZE,
        additionalQueryParams
      )
      .then((response) => setResponse(response));
  };

  const handlePageChange = (type) => {
    if (type === PREV_PAGE) {
      operationsService
        .getRecords(response.prevPageToken.substring(baseApiUrl.length))
        .then((response) => setResponse(response));
    } else {
      operationsService
        .getRecords(response.nextPageToken.substring(baseApiUrl.length))
        .then((response) => setResponse(response));
    }
  };

  const mapHistoryRecords = () => {
    return (
      response?.records.map((r) => {
        return {
          id: r.id,
          userEmail: r.userEmail,
          amount: r.amount,
          userBalance: r.userBalance,
          operationType: r.operationType,
          operationState: r.operationState,
          dateTime: r.dateTime,
        };
      }) || []
    );
  };

  return (
    <EnhancedTable
      headers={historyTableHeaders}
      rowsData={mapHistoryRecords()}
      defaultSelectedSortField={ORDER_BY_COLUMN}
      title={TITLE}
      filterConfig={historyFilterConfig}
      enableSelect={false}
      pagingData={{
        page: response?.page || 0,
        pageSize: PAGE_SIZE,
        totalRows: response?.totalRecords || 0,
        totalPages: response?.totalPages || 0,
      }}
      handlePageChange={handlePageChange}
      handleAppliedFilter={handleAppliedFilter}
      generalStyles={{ minWidth: 1300 }}
      disableCheckForIds={[]}
      defaultOrder={"desc"}
    />
  );
};
