import Profile from './components/profile/Profile';
import './Global.scss'

function App() {
  return (
    <div className='app'>
      {/* EXAMPLE */}
      <Profile
        id={1}
        avatar={null}
        name='Name'
        lastname='Lastname'
        email='email@gmail.com'
        orders={[
          { id: 1, title: 'Title 1', info: 'Order info order info order info order info order info' },
          { id: 2, title: 'Title 2', info: 'Order info order info order info order info order info' },
          { id: 3, title: 'Title 3', info: 'Order info order info order info order info order info' }
        ]} />
    </div>
  );
}

export default App;
