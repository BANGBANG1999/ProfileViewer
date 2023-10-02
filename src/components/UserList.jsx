import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import UserDetails from './UserDetails'
import Spinner from './Spinner';

function UserList({progress,setProgress}) {

    const [profiles, setProfiles] = useState([])
    const [username, setUsername] = useState([])
    const [selectedUser, setSelectedUser] = useState(profiles[0]);
    const [avatar, setAvatar] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchFailed, setFetchFailed] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const updateNameAndAvatar = async () => {
        try {
            setProgress(20)
            let url = "https://602e7c2c4410730017c50b9d.mockapi.io/users"
            setLoading(true)

            let data = await fetch(url);
            setProgress(40)

            if (!data.ok) {
                
                throw new Error("Network response was not ok");
            }

            let parsedData = await data.json();
            setLoading(false)
            setFetchFailed(false)
            // const jsonString = JSON.stringify(parsedData);
            const extractedProfiles = parsedData.map(item => item)
            const extractedUsernames = parsedData.map(item => item.profile.username);
            const extractedAvatars = parsedData.map(item => item.avatar);
            setUsername(extractedUsernames);
            setAvatar(extractedAvatars)
            setProfiles(extractedProfiles)
            setProgress(100)

            if (parsedData.length > 0) {
                setSelectedUser(parsedData[0]);
            }
            // console.log(extractedUsernames)
           
        } catch (error) {
            
            console.error("Error fetching data:", error);
            setFetchFailed(true)
            setTimeout(() => {
                setProgress(100); 
            }, 100);
        }

    }
    // console.log(profiles.id);





    // Calculate the range of profiles to display based on the current page
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage
    const displayedProfiles = profiles.slice(startIndex, endIndex);
    const npages = Math.ceil(profiles.length / itemsPerPage)
   

    const handleClick = (user) => {
        setSelectedUser(user);
        setProgress(40)
        setTimeout(()=>{
            setProgress(100)
            
        },500)
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setProgress(40)
            setTimeout(()=>{
                setProgress(100)
                
            },500)
            
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage !== npages) {
            setProgress(40)
            setTimeout(()=>{
                setProgress(100)
                
            },500)
            setCurrentPage(currentPage + 1)
        }
    }

    // const changeCPage = (id) => {
    //     setCurrentPage(id)
    // }
    useEffect(() => {
        updateNameAndAvatar()
        //eslint-disable-next-line
        
    }, [setSelectedUser]);

    return (
        <>
        
        {fetchFailed ? (
            <div className="noData">
                <p className="noDataText">No Data To Show</p>
            </div>
        ) : (
            <div className="left">
                {loading ? <Spinner /> : <div className="usersList">
                    <h2 className="usersListText">USERS LIST</h2>
                    {/* {loading && <Spinner/>} */}
                </div>}
                <div className="usersContainer">
                    {displayedProfiles.map((element) => {
                        return  <div className="user" key={element.createdAt}>
                            <img className="userImg" src="profile_icon.png"></img>
                            {/* <img className="userImg" src={element.avatar}></img> */}
                            <div onClick={() => handleClick(element)} className="userText">{element.profile.username}</div>
                        </div>
                    })}
                </div>

                {loading ? null : (
                    <nav>
                        <ul className='pagination'>
                            <li className="page-item">
                                <Link className='page-link' onClick={prevPage} style={{"cursor" : "pointer"}}><b>Prev</b></Link>
                            </li>

                            <li className="page-item">
                                <Link className='page-link' onClick={nextPage} style={{"cursor" : "pointer"}}><b>Next</b></Link>
                            </li>
                        </ul>
                    </nav>
                )}

                {selectedUser && <UserDetails user={selectedUser} />}
            </div>
        )}

        </>
    )


}

export default UserList

