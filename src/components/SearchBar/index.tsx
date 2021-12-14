import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function SearchBar({ setSearch }: Props) {
  const [text, setText] = useState('');
  const validateText = () => {
    if (!text) {
      alert('검색어를 입력해주세요.');
    } else if (text.trim().length < 2) {
      alert('최소 2글자 이상 필요합니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateText();
    if (text.trim().length >= 2) {
      setSearch(text);
      setText('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: 'inline-flex' }}>
        <p>주소 검색</p>
        <input onChange={handleChange} value={text} placeholder="검색" />
        <button type="submit">
          <SearchIcon></SearchIcon>
        </button>
      </form>
      <button
        onClick={() => {
          setSearch('');
          setText('');
        }}
      >
        초기화
      </button>
    </>
  );
}

export default SearchBar;
