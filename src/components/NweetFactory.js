import { dbService, storageService } from "fBase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import React, { useRef, useState } from "react";

const NweetFactory = ({ userObj, }) => {
    const [rweet, setRweet] = useState("");
    const [attachment, setAttachment] = useState("");
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
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = null;
    }
    const fileInput = useRef();
    return (
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
                    <img src={attachment} width="50px" height="50px" alt="img" />
                    <button onClick={onClearAttachment} >Clear</button>
                </div>
            )}
        </form>
    );
}

export default NweetFactory;