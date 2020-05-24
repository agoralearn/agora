import React, { useEffect, useRef, useState } from 'react';
import './WhiteBoard.scss';
import CanvasDraw from 'react-canvas-draw';
import { useAuth } from '../../utils/auth/';
import { Icon } from 'semantic-ui-react';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import Chat from '../Chat/Chat';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useHistory, useParams } from 'react-router-dom';

export default function WhiteBoard(props) {
  const [fillColor, setFillColor] = useState('black');
  const { socket } = useAuth();
  const { trueWindowHeight } = useWindowDimensions();
  const canvasRef = useRef(null);

  const history = useHistory();
  const { chatId } = useParams();
  const { participants } = history.location.state;

  useEffect(() => {
    socket.on('newDraw', (data) => {
      if (data.drawer !== socket.id) {
        canvasRef.current.loadSaveData(data.points, { immediate: true });
      }
    });

    socket.on('delete', (data) => {
      if (data.drawer !== socket.id) {
        canvasRef.current.clear();
      }
    });

    socket.on('join', (data) => console.log('someone joined', data));

    socket.emit('join', { chatId, participants });

    return () => {
      socket.emit('leave', { chatId });
    };
  }, [socket]);

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
        <ProfileImage
          profileImg={'https://randomuser.me/api/portraits/men/33.jpg'}
          height='60px'
          width='60px'
          className='bordered Chat_profile-imgs'
        />
        <ProfileImage
          profileImg={'https://randomuser.me/api/portraits/women/29.jpg'}
          height='60px'
          width='60px'
          className='bordered Chat_profile-imgs'
        />
        <ProfileImage
          profileImg={'https://randomuser.me/api/portraits/men/44.jpg'}
          height='60px'
          width='60px'
          className='bordered Chat_profile-imgs'
        />
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

      <div onMouseUp={() => transferCtx()}>
        <CanvasDraw
          ref={canvasRef}
          brushRadius={1}
          lazyRadius={0}
          loadTimeOffset={0}
          canvasWidth={'100%'}
          canvasHeight={trueWindowHeight - 60}
          brushColor={fillColor}
          catenaryColor={fillColor}
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
