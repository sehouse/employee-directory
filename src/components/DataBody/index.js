import React, { useContext } from 'react';
import DataAreaContext from '../../utils/DataAreaContext'

const DataBody = () => {
    const context = useContext(DataAreaContext);

    function formatDate(date){
        const dateArray = date.split('-');
        const year = dateArray[0];
        const month = dateArray[1];
        const dayArray = dateArray[2].split('T');
        const day = dayArray[0];
        const formattedDate = [month, day, year].join('-');
        return formattedDate;
    }
    return (
      <tbody>
        {context.developerState.filterUsers[0] !== undefined &&
        context.developerState.filterUsers[0].name !== undefined ? (
          context.developerState.filterUsers.map(
            ({ login, name, picture, phone, email, dob }) => {
              return (
                <tr key={login.uuid}>
                  <td data-th="Image">
                    <img
                      src={picture.medium}
                      alt={name.first + "" + name.last}
                    />
                  </td>
                  <td data-th="Name">
                    {name.first} {name.last}
                  </td>
                  <td data-th="Phone">{phone}</td>
                  <td data-th="Email">
                    <a href={"Email:" + email}>
                      {email}
                    </a>
                  </td>
                  <td data-th="DOB">{formatDate(dob.date)}</td>
                </tr>
              );
            }
          )
        ) : (
          <></>
        )}
      </tbody>
    );
}

export default DataBody;