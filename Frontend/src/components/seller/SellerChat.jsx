
import '../../styles/seller/seller_chat.css'

import { useState, useEffect } from 'react';


function SellerChat({ sellerData ,setShowProfileCard}) {

    const [conversations, setConversation] = useState([]);
    const [selectChat, setSelectChat] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    // const [tempChat,setTempChat] = useState(false);
    // console.log(chatProducts);
    const [showChatPage, setShowChatPage] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageTag, setMessageTag] = useState(null);

    const [senderId, setSenderId] = useState(sellerData.sellerId);
    const [receiverId, setReceiverId] = useState(null);


    const convoUsers = [
        {
            customerId: 1,
            fullName: "Gopi",
            productName: "Nova 5G Mobile",
            chats: [{ receiverId: senderId, senderId: 1, message: "Hii" }, { receiverId: 1, senderId: senderId, message: "Hey , Good Morning" }, { receiverId: senderId, senderId: 1, message: "Good Morning !" }]
        },
        {
            customerId: 2,
            fullName: "Jack",
            productName: "Black Shoe",
            chats: [{ receiverId: 2, senderId: senderId, message: "How are u?" }]
        },
        {
            customerId: 3,
            fullName: "King",
            productName: "Black jeans",
            chats: [{ receiverId: senderId, senderId: 3, message: "Good Good !" }]
        }
    ]

    // temprory comment 
    // useEffect(() => {
    //     setConversation(convoUsers);
    // }, []);

    useEffect(()=>{
        setReceiverId(selectChat.customerId);
    },[selectChat]);


    useEffect(() => {
        if (selectChat == null && conversations.length > 0) {
            setSelectChat(conversations[0]);
        }

    }, [conversations, selectChat])

    useEffect(() => {
        setActiveConversation(selectChat.customerId);
    }, [message]);

    // console.log("sel", selectChat);
    // console.log("convo", conversations);

    const inputMessage = (e) => {
        let tag = e.target;
        let value = tag.value;
        setMessage(value);
        setMessageTag(tag);
    }

    const sendMessage = (e) => {
        // console.log("ss",selectChat);

        if (message != '' && message != null) {
            e.preventDefault();
            setActiveConversation(selectChat.customerId);
            // setTempChat(false);
            setSenderId(sellerData.sellerId);
            setReceiverId(selectChat.customerId);

            let newChat = new Object();
            newChat.senderId = senderId;
            newChat.receiverId = selectChat.customerId;
            newChat.message = message;

            if (selectChat.chats != undefined) {

                let updatedChats = conversations.map((chat) => {
                    if (chat.customerId == receiverId) {
                        return ({
                            ...chat, chats: [...chat.chats, newChat]
                        })
                    }
                    return chat;
                });

                setConversation(updatedChats);
                setSelectChat({ ...selectChat, chats: [...selectChat.chats, newChat] });
            } else {
                setConversation([...conversations, { chats: [newChat], ...selectChat }]);
                setSelectChat({ chats: [newChat], ...selectChat });

            }

            // console.log("con",conversations);

            if (messageTag != null) {
                messageTag.value = '';
                setMessage(null);
            }
        }

    }



    return (
        <>
            <div className='sccontainer'>
                <div className="top">
                    <h2>Customer Chat</h2>
                    <div onClick={()=>setShowProfileCard(true)}>
                        <i class="fa-solid fa-user" style={{ color: 'rgb(115, 51, 242)' }}></i>
                        <span>{sellerData.fullName}</span>
                    </div>
                </div>{/* Top */}

                <div className='content4'>
                    <div className="chatlist">
                        <ul>
                            {conversations.map((data) => {
                                return (
                                    <li className={activeConversation != null && activeConversation == data.customerId ? "active" : "inactive"} onClick={() => { setSelectChat(data); setShowChatPage(true); setActiveConversation(data.customerId) }}>
                                        <div className='user'>
                                            <p>{data.fullName}</p>
                                            <p>{data.productName}</p>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>{/* chatlist */}

                    <div className="chatscreen">
                        {
                            (showChatPage ?
                                (selectChat != null &&
                                    
                                    <>
                                        <div className='top'>
                                            <h3>{selectChat.fullName}</h3>
                                            <span>{selectChat.productName}</span>
                                        </div>
                                        <div className="chats">
                                            <ul>
                                                {
                                                    (selectChat.chats != undefined &&
                                                        selectChat.chats.map((data) => {
                                                            return (
                                                                (senderId == data.senderId && data.receiverId == selectChat.customerId ?
                                                                    (<li className='sender'>{data.message}</li>) :
                                                                    (<li className='receiver'>{data.message}</li>)
                                                                )
                                                            )
                                                        })

                                                    )
                                                }

                                            </ul>
                                        </div>
                                        <div className="bottom">
                                            <input type="text" placeholder='Type a message...' onChange={inputMessage} id='messagetag' />
                                            <button onClick={sendMessage}>Send</button>
                                        </div>
                                    </>

                                ) : <>
                                    <div className='startMessageText'>
                                        <h2 >Chat Feature implement in future</h2>
                                    </div>
                                </>
                            )
                        }

                    </div>{/* chatscreen */}
                </div>
            </div>
        </>
    )
}

export default SellerChat;