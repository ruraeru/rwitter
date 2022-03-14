import { authService, dbService } from 'fBase';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    }
    const getMyRweets = async () => {
        const querySnapshot = await getDocs(
            query(
                collection(dbService, "rweets"),
                orderBy("createdAt", "desc"),
                where("createdId", "==", userObj.uid)
            )
        );
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        })
    }
    useEffect(() => {
        getMyRweets();
    }, []);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={newDisplayName}
                    type="text"
                    placeholder="Display name"
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;