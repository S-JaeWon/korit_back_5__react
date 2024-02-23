import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import TopBar from './components/TopBar/TopBar';
import RootLayout from './components/RootLayout/RootLayout';
import Mypage from './pages/Mypage/Mypage';

function App() {
  return ( // z-index 설정 안 할 시 RootLayout이 TopBar를 덮어버림
    <>
      <Reset />
      <SideBar />
      <TopBar />
      <RootLayout>
        <Routes>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/board' element={<>게시판</>}/>
          <Route path='/notice' element={<>공지사항</>}/>
        </Routes>
      </RootLayout>

    </>
  );
}

export default App;
