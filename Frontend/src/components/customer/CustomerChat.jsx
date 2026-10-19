
import { useEffect, useState } from 'react';
import '../../styles/customer/customer_chat.css'
import { data } from 'react-router-dom';


function CustomerChat({chatProducts,setChatProduct}) {

    const [conversations, setConversation] = useState([]);
    const [selectChat, setSelectChat] = useState([]);
    const [activeConversation,setActiveConversation] = useState(null);
    // const [tempChat,setTempChat] = useState(false);
    // console.log(chatProducts);
    const [customerId, setCutomerId] = useState(123);
    const [message, setMessage] = useState(null);
    const [messageTag, setMessageTag] = useState(null);

    // TEMPRORY STATE
    const [showChats,setShowChats] = useState(false);

    

    const convoUsers = [
        {
            productId: 1,
            companyName: "Nova",
            productName: "Nova 5G Mobile",
            chats: [{ receiverId: 1, senderId: 123, message: "Hii" }, { receiverId: 123, senderId: 1, message: "Hey , Good Morning" }, { receiverId: 1, senderId: 123, message: "Good Morning !" }]
        },
        {
            productId: 2,
            companyName: "ShopkeeperMax",
            productName: "Black Shoe",
            chats: [{ receiverId: 2, senderId: 234, message: "How are u?" }]
        },
        {
            productId: 3,
            companyName: "Zudio",
            productName: "Black jeans",
            chats: [{ receiverId: 2, senderId: 345, message: "Good Good !" }]
        }
    ]

    console.log("sele",selectChat);
    useEffect(() => {
        setConversation(convoUsers);
        setSelectChat(chatProducts);
    }, []);


    useEffect(() => {
        if (selectChat == null && conversations.length > 0) {
            setSelectChat(conversations[0]);
        }

    }, [conversations, selectChat])

    useEffect(()=>{
        setActiveConversation(selectChat.productId);
    },[]);

    // console.log("sel", selectChat);
    // console.log("convo", conversations);

    const inputMessage = (e) => {
        let tag = e.target;
        let value = tag.value;
        setMessage(value);
        setMessageTag(tag);
    }

    const sendMessage = async(e,product) => {
        if (message != '' && message != null) {
            e.preventDefault();
            setActiveConversation(selectChat.productId);
            // setTempChat(false);
            let senderId = localStorage.getItem("MY_USERID");
            let receiverId = selectChat.productId;
            let newChat = new Object();
            newChat.senderId = senderId;
            newChat.receiverId = receiverId;
            newChat.message = message;
            newChat.allProducts = product;
            
            if(selectChat.chats != undefined){

                let updatedChats = conversations.map((chat) => {
                if (chat.productId == receiverId) {
                    return ({
                        ...chat, chats: [...chat.chats, newChat]
                    })
                }
                return chat;
            });

                setConversation(updatedChats);
                setSelectChat({ ...selectChat, chats: [...selectChat.chats, newChat] });
            }else{
                setConversation([...conversations,{chats:[newChat],...selectChat}]);
                setSelectChat({chats: [newChat], ...selectChat});
               
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
            <div className='cchatcontainer'>
                <h2>Messages</h2>
                <div className='content1'>
                    {
                        showChats? <>
                             <div className="chatlist">
                        <ul>

                            {conversations.map((data) => {
                                return (
                                    <li className={activeConversation !=null && activeConversation == data.productId ? "active":"inactive"} onClick={() => setSelectChat(data)}>
                                        <div className='user'>
                                            <p>{data.companyName}</p>
                                            <p>{data.productName}</p>
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>{/* chatlist */}

                    <div className="chatscreen">
                        {
                            (selectChat != null &&
                                <>
                                    <div className='top'>
                                        <h3>{selectChat.companyName}</h3>
                                        <span>{selectChat.productName}</span>
                                    </div>
                                    <div className="chats">
                                        <ul>
                                            {
                                                (selectChat.chats != undefined &&
                                                    selectChat.chats.map((data) => {
                                                        return (
                                                            (customerId == data.senderId && data.receiverId == selectChat.productId ?
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
                                        <button onClick={(e)=>sendMessage(e,selectChat)}>Send</button>
                                    </div>
                                </>)
                        }


                    </div>{/* chatscreen */}
                        </>
                        : <h1>Chat feature implement in Future Version </h1>
                    }

                   
                </div>
            </div>
        </>
    )
}

export default CustomerChat;