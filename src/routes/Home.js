import Rweet from 'components/Rweet';
import { dbService, storageService } from 'fBase';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Home = ({ userObj }) => {
    const [rweet, setRweet] = useState("");
    const [rweets, setRweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const uploadFile = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(uploadFile.ref);
        };
        const rweetObj = {
            text: rweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        await addDoc(collection(dbService, "rweets"), rweetObj);
        setRweet("");
        setAttachment("");
        fileInput.current.value = null;
    };
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setRweet(value);
    };
    const onFileChange = (event) => {
        const {
            target: { files }
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const fileInput = useRef();
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={rweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind"
                    maxLength={120}
                />
                <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                <input type="submit" value="Rtweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment} >Clear</button>
                    </div>
                )}
            </form>
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