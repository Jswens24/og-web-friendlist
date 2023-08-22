import axios from "axios";
import { useEffect, useState } from "react"

export default function App() {
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');

  const getSavedFriends = async () => {
    return await axios.get('/api/friends')
      .then(res => {
        setFriends(res.data)
      })
  }

  useEffect(() => {
    getSavedFriends()
  }, [])

  const addFriend = () => {
    const newFriends = [...friends];
    newFriends.push({
      picture: picture,
      name: name
    });
    setFriends(newFriends);
    setPicture('');
    setName('');
  }

  const friendInfo = friends.map(friend => {
    return (
      <div key={friend.name}>
        <img src={friend.picture} />
        <span>{friend.name}</span>
        {addFriend}
      </div>
    )
  })


  return (
    <div>
      <label>Picture
        <input value={picture} onChange={e => setPicture(e.target.value)} placeholder="Enter picture URL" />
      </label>
      <label>Name
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
      </label>
      <button onClick={addFriend}>Add Friend</button>
      {friendInfo}
    </div>
  )

}
