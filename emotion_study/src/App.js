import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import SideBar from './components/SideBar/SideBar';
import TopBar from './components/TopBar/TopBar';
import RootLayout from './components/RootLayout/RootLayout';
import { MENUS } from './constants/menu';

function App() {
  return ( // z-index 설정 안 할 시 RootLayout이 TopBar를 덮어버림
    <>
      <Reset />
      <SideBar />
      <TopBar />
      <RootLayout>
        <Routes>
          {MENUS.map(menu => <Route key={menu.id} path={menu.path} element={menu.elemnet} />)}
        </Routes>
      </RootLayout>

    </>
  );
}

export default App;
