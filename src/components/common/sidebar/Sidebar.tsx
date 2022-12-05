import GradeIcon from '@mui/icons-material/Grade';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import PaidIcon from '@mui/icons-material/Paid';
import { FC, PropsWithChildren, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { CurrentUserContext } from '../../../context';
import style from './Sidebar.module.scss';

const Sidebar: FC<PropsWithChildren> = ({ children }) => {

  const { isVolunteer } = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(!isOpen);

  const menuItem = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <OtherHousesIcon fontSize={'medium'} />
    },
    {
      path: 'fundings',
      name: 'Fundings',
      icon: <PaidIcon fontSize={'medium'} />
    },
    {
      path: 'rateboard',
      name: 'Rateboard',
      icon: <GradeIcon fontSize={'medium'} />
    },
    {
      path: 'about',
      name: 'About',
      icon: <InfoIcon fontSize={'medium'} />
    }
  ];

  const volunteerItems = [
    {
      path: 'test1',
      name: 'Test1',
      icon: <OtherHousesIcon fontSize={'medium'} />
    },
    {
      path: 'test2',
      name: 'Test2',
      icon: <PaidIcon fontSize={'medium'} />
    },
  ];

  return (
    <div className={style.container}>
      <div className={isOpen ? style.sidebar_open : style.sidebar_close}>
        <div className={style.top_section}>
          <h1 className={isOpen ? style.title_open : style.title_close}>Menu</h1>
          <div className={isOpen ?  style.menu_open : style.menu_close}>
            <MenuIcon onClick={toggle} fontSize={'large'}/>
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className={style.link}>
              <div className={style.icon} >{item.icon}</div>
              <div className={isOpen ? style.text_open : style.text_close}>{item.name}</div>
            </NavLink>
          ))
        }
        {
          (isVolunteer) &&
          volunteerItems.map((item, index) => (
            <NavLink to={item.path} key={index} className={style.link}>
              <div className={style.icon} >{item.icon}</div>
              <div className={isOpen ? style.text_open : style.text_close}>{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;