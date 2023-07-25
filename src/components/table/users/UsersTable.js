import useAdminApi from "../../../hooks/useAdminApi";
import { EnhancedTable } from "../base/EnhancedTable";
import { useCallback, useEffect, useState } from "react";
import { baseApiUrl } from "../../../axios/CalculatorApi";
import { PREV_PAGE } from "../base/EnhancedTablePaginator";

const DEFAULT_PAGE_NUMBER = 1;
const PAGE_SIZE = 10;
const TITLE = "Users List";
const ORDER_BY_COLUMN = "status";
const actionNames = ["SWITCH STATUS", "UPGRADE ADMIN"];

const usersTableHeaders = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "balance",
    numeric: true,
    disablePadding: false,
    label: "Balance",
  },
  {
    id: "roles",
    numeric: false,
    disablePadding: false,
    label: "Roles",
  },
];

const usersFilterConfig = [
  {
    display: "User Status",
    filterFieldName: "userStatus",
    filterValue: "",
    values: ["ACTIVE", "INACTIVE"],
  },
];

export const UsersTable = () => {
  const adminsService = useAdminApi();
  const [response, setResponse] = useState({ users: [] });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers();
  }, []);
  const currentUserAdmin = "0f56cc02-2b78-4afe-a565-bd0f228918a1"

  const getAllUsers = useCallback(() => {
    adminsService
      .getUsers(undefined, DEFAULT_PAGE_NUMBER, PAGE_SIZE)
      .then((response) => {
        setResponse(response);
        setUsers(response?.users);
      });
  }, []);

  const handleAppliedFilter = async (additionalQueryParams) => {
    adminsService
      .getUsers(
        undefined,
        DEFAULT_PAGE_NUMBER,
        PAGE_SIZE,
        additionalQueryParams
      )
      .then((response) => setResponse(response));
  };

  const handlePageChange = (type) => {
    if (type === PREV_PAGE) {
      adminsService
        .getUsers(response.prevPageToken.substring(baseApiUrl.length))
        .then((response) => setResponse(response));
    } else {
      adminsService
        .getUsers(response.nextPageToken.substring(baseApiUrl.length))
        .then((response) => setResponse(response));
    }
  };

  const handleSelected = async (event, selectedUserIds) => {
    const action = event.target.innerText;
    if (action === "SWITCH STATUS") {
      Promise.all(
        selectedUserIds.map((id) => switchUserStatus(id))
      ).then((r) => getAllUsers());
    } else {
      Promise.all(
        selectedUserIds.map((id) => upgradeUserToAdmin(id))
      ).then((r) => getAllUsers());
    }
  };

  const switchUserStatus = async (selectedId) => {
    const selectedUser = users.filter((user) => user.id === selectedId)[0];
    if (selectedUser.status === "ACTIVE") {
      return await adminsService.deactivateUser(selectedUser.id);
    } else {
      return await adminsService.activateUser(selectedUser.id);
    }
  };

  const upgradeUserToAdmin = async (selectedId) => {
    const selectedUser = users.filter((user) => user.id === selectedId)[0];
    return await adminsService.setAsAdmin(selectedUser.id);
  }

  const mapUsers = () => {
    return (
      response?.users?.map((user) => {
        return { ...user, roles: user?.roles?.join(", ") };
      }) || []
    );
  };

  return (
    <EnhancedTable
      headers={usersTableHeaders}
      rowsData={mapUsers()}
      defaultSelectedSortField={ORDER_BY_COLUMN}
      title={TITLE}
      filterConfig={usersFilterConfig}
      enableSelect={true}
      pagingData={{
        page: response?.page || 0,
        pageSize: PAGE_SIZE,
        totalRows: response?.totalUsers || 0,
        totalPages: response?.totalPages || 0,
      }}
      handlePageChange={handlePageChange}
      handleAppliedFilter={handleAppliedFilter}
      generalStyles={{ minWidth: 1000 }}
      handleSelected={handleSelected}
      actionNames={actionNames}
      disableCheckForIds={[currentUserAdmin] || []}
    />
  );
};
