import React from 'react';
import './styles.scss';
import GitHubIcon from '@mui/icons-material/GitHub';
import Search from './Search';

function Header() {
  return (
    <div className="header">
      <div className="nav-left">
        <div className="logo" onClick={() => window.location.reload()}>
          <span>요소수 정보 서비스</span>
        </div>
        <div className="source" onClick={() => window.open('https://github.com/kyk1211/def-map', '_blank')}>
          <GitHubIcon fontSize="large" />
        </div>
      </div>
      <Search />
    </div>
  );
}

export default Header;
