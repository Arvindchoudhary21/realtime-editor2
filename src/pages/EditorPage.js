import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
function EditorPage() {

    // !initialization of socket connection
    const socketRef = useRef(null);

    const location = useLocation();

    const { roomId } = useParams();

    const reactNavigator = useNavigate();

    const [clients, setClients] = useState([
        // { socketId: 1, username: 'arvind c' },
        // { socketId: 2, username: 'jatin' },
        // { socketId: 3, username: 'Naina' },
        // { socketId: 4, username: 'Anand' },
    ]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();

            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket Connection failed, try again later');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} joined this room.`);
                }
                setClients(clients);
            });
            // Listening for disconnected
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room.`);
                setClients((prev) => {
                    return prev.filter(client => client.socketId !== socketId);
                })
            })
        }
        init();
        // clear the listeners alwyas ok
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        }
    }, [])



    if (!location.state) {
        return <Navigate to="/" />
    }

    return (
        <div className="mainWrap">
            <div className='aside'>
                <div className="asideInner">
                    <div className="logo">
                        <img
                            className="logoImage"
                            src="/code-sync.png"
                            alt='logo' />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {
                            clients.map((client) => (
                                <Client
                                    key={client.socketId}
                                    username={client.username}
                                />
                            ))
                        }
                    </div>
                </div>
                <button className="btn copyBtn">
                    Copy ROOM ID
                </button>
                <button className='btn leaveBtn'>
                    Leave
                </button>
            </div>
            <div className="editorWrap">
                <Editor socketRef={socketRef} roomId={roomId} />
            </div>

        </div>
    )
}

export default EditorPage
