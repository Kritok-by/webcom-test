import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export const Header = () => {
  return (
    <nav className="navigation">
      <ul className="pages">
        <li className="page">
          <NavLink to={'/'} exact activeClassName="active">
            Вход
          </NavLink>
        </li>
        <li className="page">
          <NavLink to={'/register'} exact activeClassName="active">
            Регистрация
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
