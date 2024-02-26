import ImageEx from "../pages/ImgeEx/ImageEx";
import Mypage from "../pages/Mypage/Mypage";


// sidebar와 app.js에 있는 공통요소 상수로 빼서 사용 
/**
    <RootLayout>
        <Routes>
          <Route path='/mypage' element={<Mypage />}/>
          <Route path='/board' element={<>게시판</>}/>
          <Route path='/notice' element={<>공지사항</>}/>
          <Route path='/notice' element={<>공지사항</>}/>
        </Routes>
      </RootLayout>
*/

/**
     const menus = useMemo (() => [
        {
            id: 1,
            path: "/mypage",
            name: "마이페이지"
        },

        {
            id: 2,
            path: "/board",
            name: "게시글"
        },

        {
            id: 3,
            path: "/notice",
            name: "공지사항"
        }
    ], []);
 */



export const MENUS = [
    {
        id: 1,
        path: "/mypage",
        name: "마이페이지",
        elemnet: <Mypage />
    },

    {
        id: 2,
        path: "/board",
        name: "게시판",
        elemnet: <>게시판</>
        
    },

    {
        id: 3,
        path: "/notice",
        name: "공지사항",
        elemnet: <>공지사항</> 
    },

    {
        id: 4,
        path: "/image/ex",
        name: "이미지 불러오기",
        elemnet: <ImageEx /> 
    }
];

