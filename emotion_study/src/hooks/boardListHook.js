import { useMemo } from "react";

export function useLoadList() {

    const boardList = useMemo(() => {
        const lsBoardList = localStorage.getItem("boardList");
        return !lsBoardList ? [] : JSON.parse(lsBoardList);
    }, []);

    const lastIndex = boardList.length - 1;
    const firstId = lastIndex < 0 ? 0 : boardList[0].boardId;
    const lastId = lastIndex < 0 ? 0 : boardList[boardList.length - 1].boardId;
    const size = boardList.lenth;

    return { boardList, size, firstId, lastId }; // 객체로 key : value 로 저장 
}