import React, { useCallback, useState } from 'react';
import { searchKeySet } from '../../dataSlice';
import { useAppDispatch } from '../../hooks/useAppdispatch';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const validateText = useCallback(() => {
    if (!text) {
      alert('검색어를 입력해주세요.');
    } else if (text.trim().length < 2) {
      alert('최소 2글자 이상 필요합니다.');
    }
  }, [text]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      validateText();
      if (text.trim().length >= 2) {
        dispatch(searchKeySet(text));
        setText('');
      }
    },
    [text, setText, validateText, dispatch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={text} placeholder="주소 검색" />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
      <button
        onClick={() => {
          dispatch(searchKeySet(''));
          setText('');
        }}
      >
        초기화
      </button>
    </div>
  );
}
