import BoardEx from "../pages/BoardEx/BoardEx";
import BoardList from "../pages/BoardList/BoardList";
import BoardWrite from "../pages/BoardWrite/BoardWrite";
import ImageEx from "../pages/ImageEx/ImageEx";
import ImageEx2 from "../pages/ImageEx2/ImageEx2";
import ImageEx3 from "../pages/ImageEx3/ImageEx3";
import ImageEx3_1 from "../pages/ImageEx3/ImageEx3_1";
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
    },

    {
        id: 5,
        path: "/image/ex2",
        name: "이미지 다중 업로드",
        elemnet: <ImageEx2 /> 
    },

    {
        id: 6,
        path: "/image/ex3",
        name: "이미지 다중 불러오기",
        elemnet: <ImageEx3_1 /> 
    },

    {
        id: 7,
        path: "/board/write",
        name: "게시글 작성",
        elemnet: <BoardWrite /> 
    },

    {
        id: 8,
        path: "/board/list",
        name: "게시글 목록",
        elemnet: <BoardList /> 
    }
];

