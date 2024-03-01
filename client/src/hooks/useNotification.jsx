import { useState } from 'react';
import io from 'socket.io-client';



const Notifi_Group = () => {
    const [notification, setNotification] = useState([])

    const token = localStorage.getItem('access_token')
    if(!token){
        return (
          <div>
            no token
          </div>
        )
      }
      const {access_token} = JSON.parse(token);

      const socket = io("http://localhost:3000/", {
        extraHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      })
      //////////
      socket.on('notification', (data)=>{
        setNotification([data])
      })
      //////////
      const handleJoinRoom_ = (roomId) => {
        console.log(roomId ,"the room id")
        socket.emit('joinRoom', roomId);
      };
      //////////
      const handleMessageSend_ = (roomId ,message) => {
        // Emit 'sendMessage' event with message and room ID
        socket.emit('sendMessage', { room: roomId, message });
      };
      return {notification,handleJoinRoom_,handleMessageSend_}
}
export default Notifi_Group