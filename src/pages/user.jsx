import React from 'react'

const user = () => {
  return (
    <div>
      <br />
      <div className="panel panel-default">
        <div className="panel-heading" id="panel-head">
          <div id="panel-margin">
            <i className="glyphicon glyphicon-th"></i>
            <strong> MANAGE USERS</strong>
          </div>
        </div>
        <div className="panel-body">
          <table>
            <thead>
              <tr id="head-row">
                <th>S No.</th>
                <th>Name</th>
                <th>User Role</th>
                <th>Status</th>
                <th>Last Login</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1.
                </td>
                <td>
                  Riya Kansal
                </td>
                <td>
                 Admin
                </td>
                <td className ="text-center">
                 <span className="label label-success">Active</span>
                </td>
                <td>
                 21st July 2023 11:00am
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default user