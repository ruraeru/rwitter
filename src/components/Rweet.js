import { dbService, storageService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

const Rweet = ({ rweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newRweet, setNewRweet] = useState(rweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("해당 품목을 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, "rweets", rweetObj.id));
            if (rweetObj.attachmentUrl !== "") {
                const urlRef = ref(storageService, rweetObj.attachmentUrl);
                await deleteObject(urlRef);
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "rweets", rweetObj.id), {
            text: newRweet + " (수정됨)",
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewRweet(value);
    }
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your rweet"
                            onChange={onChange}
                            value={newRweet}
                            required
                        />
                        <input type="submit" value="Update Rweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : <>
                <h4>{rweetObj.text}</h4>
                {rweetObj.attachmentUrl && <img src={rweetObj.attachmentUrl} width="50px" height="50px" alt="img" />}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Rweet</button>
                        <button onClick={toggleEditing}>Edit Rweet</button>
                    </>
                )}
            </>
            }
        </div>
    );
};

export default Rweet;