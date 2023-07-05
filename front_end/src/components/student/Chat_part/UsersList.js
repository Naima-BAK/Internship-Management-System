import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function UsersList({ users, currentUser, onUserSelect }) {

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const filtered = users.filter(user => parseInt(user.id) !== currentUser);
        setSelectedUsers(filtered);
    }, [users, currentUser]);


    const searchByName = (e) => {
        const searchQuery = e.target.value.toLowerCase(); // Get the search query entered by the user and convert it to lowercase
        if (searchQuery === '') { // If the search query is empty
            const filtered = users.filter(user => parseInt(user.id) !== currentUser); // Filter the list of users to exclude the current user
            setSelectedUsers(filtered); // Update the list of filtered users
        } else { // If the search query is not empty
            const filtered = users.filter(user => parseInt(user.id) !== currentUser && user.name.toLowerCase().includes(searchQuery)); // Filter the list of users to exclude the current user and include only those whose names match the search query
            setSelectedUsers(filtered); // Update the list of filtered users
        }
    }

    return (
        <div className="col-12 col-lg-5 col-xl-3 border-right" >
            <div className="px-4 d-none d-md-block" >
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <input type="text" className="form-control my-3"
                            onChange={searchByName}
                            placeholder="Search..." />
                    </div>
                </div>
            </div>

            {selectedUsers.map(user => (


                <li key={user.id} className="list-group-item list-group-item-action border-0" style={{ marginLeft: '15px' }}>
                    {/* <div className="badge bg-success float-right">5</div> */}
                    <button className="d-flex align-items-start" onClick={() => onUserSelect(user)}>
                        <img src={`../../../profile/${user.image}`} className="rounded-circle mr-1" alt="user" width="40" height="40" />
                        <div className="flex-grow-1 ml-3">
                            {user.name}
                        </div>
                    </button>
                </li>

            ))}

            <hr className="d-block d-lg-none mt-1 mb-0" />
        </div>
    );
}

export default UsersList;