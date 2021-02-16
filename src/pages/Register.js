import React, { useState } from 'react';
import validator from 'validator';
import './index.scss';
import arrow from './small-arrow.svg';

export const Register = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const [data, setData] = useState({
    email: '',
    tel: '',
    pass: '',
    confirmPass: '',
    region: 'default',
    check: false,
  });
  const [messages, setMessages] = useState({
    email: null,
    tel: null,
    pass: null,
    confirmPass: null,
    region: null,
    check: false,
  });
  const openPassword = () => {
    setIsOpen(!isOpen);
  };
  const openPasswordTwo = () => {
    setIsOpenTwo(!isOpenTwo);
  };

  const checkToggle = () => {
    setData({ ...data, check: !data.check });
  };

  const validateEmail = () => {
    if (validator.isEmpty(data.email)) {
      setMessages({ ...messages, email: 'обязательное поле' });
    } else if (!validator.isEmail(data.email)) {
      setMessages({ ...messages, email: 'некорректный Email' });
    } else {
      setMessages({ ...messages, email: false });
    }
  };
  const validatePassword = () => {
    const patt = /^[a-zA-Z\d]+$/i;
    switch (true) {
      case validator.isEmpty(data.pass):
        setMessages({ ...messages, pass: 'обязательное поле' });
        break;
      case data.pass.length < 8:
        setMessages({ ...messages, pass: 'не меньше 8 символов' });
        break;
      case !patt.test(data.pass):
        setMessages({
          ...messages,
          pass:
            'Пароль должен состоять только из цифр и букв латинского алфавита',
        });
        break;
      case !/[0-9]/.test(data.pass) ||
        !/[a-z]/.test(data.pass) ||
        !/[A-Z]/.test(data.pass):
        setMessages({
          ...messages,
          pass:
            'Пароль должен содержать как минимум 1 цифру, 1 заглавную и 1 прописную букву',
        });
        break;
      default:
        setMessages({ ...messages, pass: false });
        break;
    }
  };
  const validateTel = () => {
    switch (true) {
      case validator.isEmpty(data.tel):
        setMessages({ ...messages, tel: 'обязательное поле' });
        break;
      case !validator.isMobilePhone(data.tel):
        setMessages({ ...messages, tel: 'некорректный номер' });
        break;
      default:
        setMessages({ ...messages, tel: false });
        break;
    }
  };
  const validateConfirmPass = () => {
    if (validator.isEmpty(data.confirmPass)) {
      setMessages({ ...messages, confirmPass: 'обязательное поле' });
    } else if (data.pass !== data.confirmPass) {
      setMessages({ ...messages, confirmPass: 'Пароли не совпадают' });
    } else {
      setMessages({ ...messages, confirmPass: false });
    }
  };
  const validateRegion = () => {
    if (data.region == 'default') {
      setMessages({ ...messages, region: 'обязательное поле' });
    } else {
      setMessages({ ...messages, region: false });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !messages.email &&
      !messages.tel &&
      !messages.pass &&
      !messages.confirmPass &&
      !messages.region &&
      data.checked
    ) {
      setMessages({ ...data, check: false });
      console.log(data);
    } else {
      if (!data.checked) {
        setMessages({ ...data, check: true });
      }
      validateRegion();
      validatePassword();
      validateTel();
      validateEmail();
    }
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      <label className="form__label" htmlFor="email">
        Введите E-mail
      </label>
      <div className={`form__input email ${messages.email ? 'error' : ''}`}>
        <input
          type="text"
          placeholder="E-mail"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          onBlur={validateEmail}
        />
        <span
          className="error-message"
          style={messages.email ? { display: 'block' } : { display: 'none' }}
        >
          {messages.email}
        </span>
      </div>
      <label className="form__label" htmlFor="tel">
        Введите телефон
      </label>
      <div className={`form__input ${messages.tel ? 'error' : ''}`}>
        <input
          type="tel"
          placeholder="Телефон"
          id="tel"
          value={data.tel}
          onChange={(e) => setData({ ...data, tel: e.target.value })}
          onBlur={validateTel}
        />
        <span
          className="error-message"
          style={messages.tel ? { display: 'block' } : { display: 'none' }}
        >
          {messages.tel}
        </span>
      </div>
      <label className="form-label" htmlFor="pass">
        Введите пароль
      </label>
      <div className={`form__input ${messages.pass ? 'error' : ''}`}>
        <input
          type={isOpen ? 'text' : 'password'}
          placeholder="Пароль"
          id="pass"
          value={data.pass}
          onChange={(e) => setData({ ...data, pass: e.target.value })}
          onBlur={validatePassword}
        />
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          xmlns="http://www.w3.org/2000/svg"
          className="pass-img"
          fill={isOpen ? '#595959' : '#85888C'}
          onClick={openPassword}
        >
          <path d="M5.79332 14.75H2.50522C1.81453 14.75 1.25261 14.1892 1.25261 13.5V8.375C1.25261 7.68575 1.81453 7.125 2.50522 7.125H11.524C12.2147 7.125 12.7766 7.68575 12.7766 8.375V9.03125C12.7766 9.37644 13.057 9.65625 13.4029 9.65625C13.7488 9.65625 14.0292 9.37644 14.0292 9.03125V8.375C14.0292 6.9965 12.9054 5.875 11.524 5.875H10.7713V3.67081C10.7713 1.64672 9.08552 0 7.01346 0C4.94139 0 3.25563 1.64672 3.25563 3.67081V5.875H2.50522C1.12384 5.875 0 6.9965 0 8.375V13.5C0 14.8785 1.12384 16 2.50522 16H5.79332C6.13923 16 6.41962 15.7202 6.41962 15.375C6.41962 15.0298 6.13923 14.75 5.79332 14.75ZM4.50824 3.67081C4.50824 2.33597 5.63208 1.25 7.01346 1.25C8.39483 1.25 9.51867 2.33597 9.51867 3.67081V5.875H4.50824V3.67081Z" />
          <path d="M14.8846 12.6095C14.8626 12.5782 14.7871 12.4715 14.7401 12.4126C14.5304 12.1494 14.0394 11.533 13.3562 10.9889C12.4803 10.2912 11.5788 9.9375 10.677 9.9375C9.77512 9.9375 8.87368 10.2912 7.99776 10.9888C7.31446 11.533 6.82347 12.1494 6.61403 12.4123C6.56697 12.4713 6.49137 12.5781 6.46933 12.6094C6.31754 12.825 6.31751 13.1124 6.46926 13.328C6.49134 13.3593 6.56694 13.4661 6.61385 13.5249C6.82347 13.7881 7.31446 14.4044 7.99773 14.9486C8.87368 15.6463 9.77512 16 10.677 16C11.5788 16 12.4802 15.6463 13.3562 14.9487C14.0394 14.4045 14.5305 13.7882 14.7402 13.5248C14.7871 13.4659 14.8626 13.3593 14.8846 13.3281C15.0364 13.1125 15.0364 12.825 14.8846 12.6095ZM10.677 14.75C9.74675 14.75 8.77172 14.1511 7.77586 12.9688C8.77165 11.7864 9.74669 11.1875 10.677 11.1875C11.6071 11.1875 12.5823 11.7865 13.5781 12.9688C12.5823 14.1511 11.6072 14.75 10.677 14.75Z" />
          <path d="M10.7098 14.1562C11.367 14.1562 11.8998 13.6246 11.8998 12.9688C11.8998 12.3129 11.367 11.7812 10.7098 11.7812C10.0526 11.7812 9.51984 12.3129 9.51984 12.9688C9.51984 13.6246 10.0526 14.1562 10.7098 14.1562Z" />
        </svg>
        <span
          className="error-message"
          style={messages.pass ? { display: 'block' } : { display: 'none' }}
        >
          {messages.pass}
        </span>
      </div>
      <label className="form-label" htmlFor="more-pass">
        Повторите пароль
      </label>
      <div className={`form__input ${messages.confirmPass ? 'error' : ''}`}>
        <input
          type={isOpenTwo ? 'text' : 'password'}
          placeholder="Пароль"
          id="more-pass"
          value={data.confirmPass}
          onChange={(e) => setData({ ...data, confirmPass: e.target.value })}
          onBlur={validateConfirmPass}
        />
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          xmlns="http://www.w3.org/2000/svg"
          className="pass-img"
          fill={isOpenTwo ? '#595959' : '#85888C'}
          onClick={openPasswordTwo}
        >
          <path d="M5.79332 14.75H2.50522C1.81453 14.75 1.25261 14.1892 1.25261 13.5V8.375C1.25261 7.68575 1.81453 7.125 2.50522 7.125H11.524C12.2147 7.125 12.7766 7.68575 12.7766 8.375V9.03125C12.7766 9.37644 13.057 9.65625 13.4029 9.65625C13.7488 9.65625 14.0292 9.37644 14.0292 9.03125V8.375C14.0292 6.9965 12.9054 5.875 11.524 5.875H10.7713V3.67081C10.7713 1.64672 9.08552 0 7.01346 0C4.94139 0 3.25563 1.64672 3.25563 3.67081V5.875H2.50522C1.12384 5.875 0 6.9965 0 8.375V13.5C0 14.8785 1.12384 16 2.50522 16H5.79332C6.13923 16 6.41962 15.7202 6.41962 15.375C6.41962 15.0298 6.13923 14.75 5.79332 14.75ZM4.50824 3.67081C4.50824 2.33597 5.63208 1.25 7.01346 1.25C8.39483 1.25 9.51867 2.33597 9.51867 3.67081V5.875H4.50824V3.67081Z" />
          <path d="M14.8846 12.6095C14.8626 12.5782 14.7871 12.4715 14.7401 12.4126C14.5304 12.1494 14.0394 11.533 13.3562 10.9889C12.4803 10.2912 11.5788 9.9375 10.677 9.9375C9.77512 9.9375 8.87368 10.2912 7.99776 10.9888C7.31446 11.533 6.82347 12.1494 6.61403 12.4123C6.56697 12.4713 6.49137 12.5781 6.46933 12.6094C6.31754 12.825 6.31751 13.1124 6.46926 13.328C6.49134 13.3593 6.56694 13.4661 6.61385 13.5249C6.82347 13.7881 7.31446 14.4044 7.99773 14.9486C8.87368 15.6463 9.77512 16 10.677 16C11.5788 16 12.4802 15.6463 13.3562 14.9487C14.0394 14.4045 14.5305 13.7882 14.7402 13.5248C14.7871 13.4659 14.8626 13.3593 14.8846 13.3281C15.0364 13.1125 15.0364 12.825 14.8846 12.6095ZM10.677 14.75C9.74675 14.75 8.77172 14.1511 7.77586 12.9688C8.77165 11.7864 9.74669 11.1875 10.677 11.1875C11.6071 11.1875 12.5823 11.7865 13.5781 12.9688C12.5823 14.1511 11.6072 14.75 10.677 14.75Z" />
          <path d="M10.7098 14.1562C11.367 14.1562 11.8998 13.6246 11.8998 12.9688C11.8998 12.3129 11.367 11.7812 10.7098 11.7812C10.0526 11.7812 9.51984 12.3129 9.51984 12.9688C9.51984 13.6246 10.0526 14.1562 10.7098 14.1562Z" />
        </svg>
        <span
          className="error-message"
          style={
            messages.confirmPass ? { display: 'block' } : { display: 'none' }
          }
        >
          {messages.confirmPass}
        </span>
      </div>
      <label htmlFor="more-region" className="form-label">
        Выберите регион
      </label>
      <div className={`form__input ${messages.region ? 'error' : ''}`}>
        <select
          onBlur={validateRegion}
          onChange={(e) => setData({ ...data, region: e.target.value })}
        >
          <option value="default">Регион</option>
          <option value="Минск">Минск</option>
          <option value="Брест">Брест</option>
          <option value="Гомель">Гомель</option>
          <option value="Могилев">Могилев</option>
          <option value="Гродно">Гродно</option>
          <option value="Витебск">Витебск</option>
        </select>
        <img src={arrow} alt="arrow" className="arrow" />
        <span
          className="error-message"
          style={messages.region ? { display: 'block' } : { display: 'none' }}
        >
          выберите регион
        </span>
      </div>
      <input type="checkbox" id="check" />
      <div className="chekbox">
        <label
          htmlFor="check"
          className={`form__label check ${data.check ? 'active' : ''}`}
          onClick={checkToggle}
        >
          <span>Примите</span>
        </label>
        <a href="#" className="forgot-password">
          пользовательское соглашение
        </a>
        <span
          className="error-message"
          style={messages.check ? { display: 'block' } : { display: 'none' }}
        >
          Вы должны принять условия пользовательского соглашения
        </span>
      </div>
      <button className="submit" type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};
