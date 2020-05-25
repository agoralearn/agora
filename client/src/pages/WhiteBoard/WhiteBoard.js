import React, { useEffect, useRef, useState, useCallback } from 'react';
import './WhiteBoard.scss';
import CanvasDraw from 'react-canvas-draw';
import { useAuth } from '../../utils/auth/';
import { Icon } from 'semantic-ui-react';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import Chat from '../Chat/Chat';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useHistory, useParams } from 'react-router-dom';

export default function WhiteBoard() {
  const [fillColor, setFillColor] = useState('black');
  const [drawState, setDrawState] = useState(null);
  const [participants, setParticipants] = useState(
    useHistory().location.state.participants
  );

  const { socket, user } = useAuth();
  const { trueWindowHeight } = useWindowDimensions();
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const { chatId } = useParams();

  const updateOnlineStatus = useCallback((userIds) => {
    setParticipants((participants) => {
      return participants.map((user) => {
        if (userIds.includes(user._id)) {
          user.online = true;
        } else {
          user.online = false;
        }

        return user;
      });
    });
  }, []);

  useEffect(() => {
    socket.on('newDraw', (data) => {
      if (data.drawer !== socket.id) {
        setDrawState(data.points);
      }
    });

    socket.on('delete', () => {
      canvasRef.current.clear();
    });

    socket.on('joinData', (data) => {
      setDrawState(data);
    });

    socket.on('userJoined', ({ userIds }) => {
      updateOnlineStatus(userIds);
    });

    socket.on('userLeft', ({ userIds }) => {
      updateOnlineStatus(userIds);
    });

    socket.emit('join', { chatId });

    // Clean up old socket listeners
    return () => {
      socket.emit('leave', { chatId, userId: user.id });
      socket.off('newDraw');
      socket.off('delete');
      socket.off('join');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('joinData');
    };
  }, [socket, updateOnlineStatus, chatId, user.id]);

  function transferCtx() {
    socket.emit('draw', {
      points: canvasRef.current.getSaveData(),
      drawer: socket.id,
      room: chatId
    });
  }

  function clearCanvashandler() {
    canvasRef.current.clear();
    socket.emit('deleteDraw', { drawer: socket.id, room: chatId });
  }

  function chooseColorHandler(e, color) {
    e.stopPropagation();
    setFillColor(color);
  }
  return (
    <div className='Whiteboard-wrapper'>
      <div className='WhiteBoard-participants'>
        {participants.map((person) => {
          if (person._id === user.id) {
            person.online = true;
          }

          return (
            <ProfileImage
              key={person._id}
              profileImg={person.image}
              height='60px'
              width='60px'
              className='bordered Chat_profile-imgs'
              online={person.online ? true : false}
              status
            />
          );
        })}
      </div>
      <div className='Whiteboard-controls'>
        <div onClick={clearCanvashandler}>
          <Icon name='trash' color='red' size='large'></Icon>
        </div>
        <div
          className='WhiteBoard-color-choice black'
          onClick={(e) => chooseColorHandler(e, 'black')}
        ></div>
        <div
          className='WhiteBoard-color-choice green'
          onClick={(e) => chooseColorHandler(e, 'green')}
        ></div>
        <div
          className='WhiteBoard-color-choice red'
          onClick={(e) => chooseColorHandler(e, 'red')}
        ></div>
        <div
          className='WhiteBoard-color-choice dodgerblue'
          onClick={(e) => chooseColorHandler(e, 'dodgerblue')}
        ></div>
        <div
          className='WhiteBoard-color-choice orange'
          onClick={(e) => chooseColorHandler(e, 'orangered')}
        ></div>

        <div
          className='WhiteBoard-color-choice yellow'
          onClick={(e) => chooseColorHandler(e, 'yellow')}
        ></div>
      </div>

      <div onMouseUp={() => transferCtx()} ref={canvasWrapperRef}>
        <CanvasDraw
          ref={canvasRef}
          brushRadius={1}
          lazyRadius={0}
          loadTimeOffset={0}
          canvasWidth={'100%'}
          canvasHeight={trueWindowHeight - 60}
          brushColor={fillColor}
          catenaryColor={fillColor}
          onChange={() => console.log('CANVAS IS CHANGING')}
          immediateLoading={true}
          saveData={drawState}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 100,
          background: 'white'
        }}
      >
        <Chat
          match={{ params: { chatId: chatId } }}
          width='300px'
          height='400px'
          miniChat
        />
      </div>
    </div>
  );
}
