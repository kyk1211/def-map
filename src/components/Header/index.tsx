import React, { useCallback, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './styles.scss';
import { useAppDispatch } from '../../hooks/useAppdispatch';
import { searchKeySet } from '../../dataSlice';

function Header() {
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
    [text, setText, validateText]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText]
  );

  return (
    <div className="header">
      <div className="logo" onClick={() => window.location.reload()}>
        <span>요소수 정보 서비스</span>
      </div>
      <div className="search-container">
        <form onSubmit={handleSubmit}>
          <span>주소 검색</span>
          <input onChange={handleChange} value={text} placeholder="검색" />
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
    </div>
  );
}

export default Header;
