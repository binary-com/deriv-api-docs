import React, { useState } from 'react';
import './custom-tabs.scss';

const CustomTabs: React.FC<{
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='tabs'>
      <div className='tabs_header'>
        <div className='tabs_header__items'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`tabs_header__item ${activeTab === index ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div className='tabs_content'>{tabs[activeTab].content}</div>
    </div>
  );
};

export default CustomTabs;
