import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import Nav from '../Nav';
import DataAreaContext from '../../utils/DataAreaContext';
import API from '../../utils/API';
import "./DataArea.css";

const DataArea = () => {
    const [developerState, setDeveloperState] = useState({
        users: [],
        order: 'ascend',
        filterUsers: [],
        headings: [
            { name: 'Image', width: '20%', },
            { name: 'Name', width: '20%', },
            { name: 'Phone', width: '20%', },
            { name: 'Email', width: '20%', },
            { name: 'DOB', width: '20%', }
        ]
    });

    const handleSort = heading => {
        if (developerState.order === 'descend') {
            setDeveloperState({
                order: 'ascend'
            })
        } else {
            setDeveloperState({
                order: 'descend'
            })
        }
        const compare = (x, y) => {
            if (developerState.order === 'ascend') {
                if (x[heading] === undefined) {
                    return 1;
                } else if (y[heading] === undefined) {
                    return -1;
                } else if (heading === 'name') {
                    return x[heading].first.localeCompare(y[heading].first);
                } else {
                    return y[heading] - x[heading];
                }
            } else {
                if (x[heading] === undefined) {
                    return 1;
                } else if (y[heading] === undefined) {
                    return -1;
                } else if (heading === 'name') {
                    return y[heading].first.localeCompare(x[heading].first);
                } else {
                    return y[heading] - x[heading];
                }
            }
        }

        const userSort = developerState.filterUsers.sort(compare);

        setDeveloperState({
            ...developerState,
            filterUsers: userSort
        });
    };

    const handleSearch = event => {
        const filter = event.target.value;
        const filterList = developerState.users.filter(item => {
            let values = item.name.first.toLowerCase();
            return values.indexOf(filter.toLowerCase()) !== -1;
        });

        setDeveloperState({
            ...developerState,
            filterUsers: filterList
        });
    };

    useEffect(() => {
        API.getUsers().then(results => {
            setDeveloperState({
                ...developerState,
                users: results.data.results,
                filterUsers: results.data.results
            });
        });
    }, []);

    return (
        <DataAreaContext.Provider
            value={{ developerState, handleSearch, handleSort }}>
            <Nav />
            <div className='data-area'>
                {developerState.filterUsers.length > 0 ? <DataTable /> : <div></div>}
            </div>
        </DataAreaContext.Provider>
    );
}

export default DataArea