import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        // console.log(id); // generating the unique id
        // !jo toast aa rha oske liye corner me 
        toast.success('Created a new room');

    }

    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('Room ID and username is required');
            return;
        }
        // redirect to editor page and we are passing the username to the editor page by using the state ok
        navigate(`/editor/${roomId}`, {
            state: {
                username,

            },
        });
    };
    // enter press krne se room join ho jaye
    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    }

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <img className="homePageLogo" src="/code-sync.png" alt='code-sync'></img>
                <h4 className="mainLabel">Paste Invitaion ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button
                        className="btn joinBtn"
                        onClick={joinRoom}
                    >Join</button>
                    <span className="createInfo">
                        If you don't have invite then create &nbsp;
                        <a onClick={createNewRoom} href="" className="createNewBtn">new room</a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built by arvind</h4>
            </footer>
        </div>
    )
}

export default Home
