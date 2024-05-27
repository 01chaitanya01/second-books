import React, { useState, useEffect } from 'react';
import "../styles/authentication.css";
import registerImage from "../images/register.png";
import Register from './Register';
import Login from './Login';
import { useParams } from 'react-router-dom';
import { FaLariSign } from 'react-icons/fa6';
import OptPage from './OtpPage';

const Authentication = () => {
  const { authType } = useParams();
  const [showComponent, setShowComponent] = useState(null);

  const [animation, setAnimation] = useState(false)

  useEffect(() => {

    setAnimation(true)

    const timeoutId = setTimeout(() => {
      switch (authType) {
        case 'register':
          setShowComponent(<Register />);
          break;
        case 'login':
          setShowComponent(<Login />);
          break;
        case 'registerOtp':
          setShowComponent(<OptPage />);
          break;
        case 'loginOtp':
          setShowComponent(<OptPage />);
          break;
        default:
          setShowComponent(null);
          break;
      }
      setAnimation(false)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [authType]);

  return (
    <div className='register'>
      <div className="register-container">

        <div className="register-image">
          <img src={registerImage} alt="" />
        </div>

        <div className={`register-form-container ${animation ? 'out-animation' : "in-animation"} `}>
          {showComponent}
        </div>

      </div>
    </div>
  );
};

export default Authentication;
