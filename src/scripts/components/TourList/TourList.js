import React from 'react';
import PropTypes from 'prop-types';

import {outerResources} from '../../../../resources/webpack/env-variables';
import getCWD from '../../../helpers/src-url';
import fileOperations from '../../../helpers/file-operations';
import Search from '../Search/Search';
import TourItem from '../TourItem/TourItem';

import './TourList.css';

const logo = '../../../images/gt-logo-179x69.png';
const parsedLogo = fileOperations.parseFilePath(logo);
// TODO: move this call to separate function
require.context(parsedLogo.dir, true, filenameToRegExp(parsedLogo.base)).req('./' + parsedLogo.base);

// const filepath = '../../../images/';
// const filename = 'gt-logo-179x69.png';
// const regexp = new RegExp('gt-logo-179x69\\.png$');
// console.log('regexp=', regexp);
// console.log(regexp)



// const req = require.context('../../../images/', true, filenameToRegExp(filename));
// const parsedImg = path.parse('../../../images/gt-logo-179x69.png');
// import img from '../../../images/gt-logo-179x69.png';
// // const req = require.context('../../../images/gt-logo-179x69.png', true);
// req('./' + filename);
// console.log('req=', req);

TourList.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function TourList({tourList}) {
  // const imgPath = getCWD() - images
  const logoOutput = getCWD() + outerResources.img.output + parsedLogo.base; //'images/gt-logo-179x69.png'; // place after build
  console.log('logoOutput=', logoOutput);
  // const imgPath = 'http://ecsb00100c96.epam.com/MicroStrategy/asp/Gt3/CommonUI/images/gt-logo-179x69.png';

  return (
    <div className="gt-tours-list-component">
      <div styleName="logo">
        <img src={logoOutput} alt="logo"/>
      </div>
      <div styleName="main-header">Available Guided Tours
        <Search/> {/* TODO: add props with saved search */}
      </div>
      <button name="addNew" styleName="action">Add New</button>
      <button name="settings" styleName="action">Settings</button>
      <div styleName="table">
        <TourItem isHeader={true}/>
        {tourList.map(tour => <TourItem {...tour} key={tour.tourName}/>)}
      </div>
    </div>
  )
}
