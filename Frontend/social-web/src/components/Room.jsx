import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import '../styles/Room.css'
const Room = () => {
  const { roomid } = useParams()
  const videoContainerRef = useRef(null)
  const myMeeting = () => {
    const appID = 1679131366;
    const serverSecret = "77b0884621ba181e470426e51dd4abe2";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomid, Date.now().toString(), "Harry Jack");
    const zp = ZegoUIKitPrebuilt.create(kitToken)

    zp.joinRoom({
      container: videoContainerRef.current,
      sharedLinks: [
        {
          name: 'Video link',
          url:
            window.location.protocol + '//' +
            window.location.host + window.location.pathname
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  useEffect(() => {
    myMeeting()
  }, [])
  return (
    <>
      <div ref={videoContainerRef} className='videocalldone'></div>
    </>
  )
}

export default Room
