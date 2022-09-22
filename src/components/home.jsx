
  import React, { useState,useEffect } from "react";
  import { useForm } from "react-hook-form";
  import adminService from "../service/admin-service";
  import { DataTable } from 'primereact/datatable';
  import { Column } from 'primereact/column';
  import{InputText} from 'primereact/inputtext'
  import { Dropdown } from "primereact/dropdown";
  import { Navigate, useNavigate } from "react-router-dom";


export const Home = (props) => {

  const [users, setUsers] = useState([]);


  useEffect(() => {
    adminService.getAllUsers().then(
      (result) => {
        setUsers(result);
        console.log(users);
      },
      (failure) => {
        console.log(failure);
      }

    )
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const statuses = [
    { label: 'Enabled', value: 1 },
    { label: 'Disabled', value: 0 },
];

  const onRowEditComplete1 = (e) => {
    let _users2 = [...users];
    let { newData, index } = e;

    _users2[index] = newData;

    setUsers(_users2);
}

const getStatusLabel = (status) => {
  switch (status) {
      case 1:
          return 'Enabled';

      case 0:
          return 'Disabled';

      default:
          return 'NA';
  }
}

const statusBodyTemplate = (rowData) => {
  return <span className={`product-badge status-${rowData.enabled}`}>{getStatusLabel(rowData.enabled)}</span>;
}

const rolesBody = (rowData) => {

  return <span className={`product-badge status-`}>{rowData.roles[0].name}</span>;
}

const statusEditor = (options) => {
  return (
      <Dropdown value={options.value} options={statuses} optionLabel="label" optionValue="value"
          onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
          itemTemplate={(option) => {
              return <span className={`product-badge status-${option.value}`}>{option.label}</span>
          }} />
  );
}

  const textEditor = (options) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

    return (
      <div>
            <div className="card">
                <DataTable value={users} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete1} responsiveLayout="scroll">
                    <Column field="id" header="id"></Column>
                    <Column field="username" header="Username"  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="email" header="Email"  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="roles" header="Role" body={rolesBody}  editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="enabled" header="Status"  body={statusBodyTemplate} editor={(options) => statusEditor(options)}  style={{ width: '20%' }}></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>


                
            </div>
        </div>
    );
  }