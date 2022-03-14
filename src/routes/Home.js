import Rweet from 'components/Rweet';
import { dbService } from 'fBase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    const [rweets, setRweets] = useState([]);
    useEffect(() => {
        const q = query(collection(dbService, "rweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, collection(dbService, "rweets"), (snapshot) => {
            const rweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setRweets(rweetArray);
        });
    }, []);
    return (
        <div>
            <NweetFactory userObj={userObj} />
            <div>
                {rweets.map((rweet) => (
                    <Rweet
                        key={rweet.id}
                        rweetObj={rweet}
                        isOwner={rweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;