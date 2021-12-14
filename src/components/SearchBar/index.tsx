import React, { useState } from "react";

interface Props {
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({setSearch}: Props) {
    const [text, setText] = useState('')
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(text);
        setText('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit} style={{display: 'inline-flex'}}>
            <p>주소</p>
            <input onChange={handleChange} value={text} placeholder="검색" required/>
            <button type="submit">제출</button>
        </form>
    )
};

export default SearchBar;