import React, { useContext } from 'react';
import DataAreaContext from '../../utils/DataAreaContext'

const DataBody = () => {
    const context = useContext(DataAreaContext);

    const formatDate = (date)=>{
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
            {context.developerState.filteredUsers[0] !== undefined && context.developerState.filteredUsers[0].name !== undefined ? (context.developerState.filteredUsers.map(({ login, name, picture, phone, email, dob }) => {
                return (
                    <tr key={login.uuid}>
                        <td data-th='Image'>
                            <img src={picture.medium} alt={name.first + '' + name.last} />
                        </td>
                        <td data-th='Name'>
                            {name.first} {name.last}
                        </td>
                        <td data-th='Email'>
                            <a href={'Email:' + email} target='_blank'>
                                {email}
                            </a>
                        </td>
                        <td data-th='DOB'>
                            {formatDate(dob.date)}
                        </td>
                    </tr>
                );
            })
            ) : (
                    <></>
                )}
        </tbody>
    );
}

export default DataBody;