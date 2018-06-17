//Level list

import React from 'react';
import { Link } from 'react-router-dom';
import levels from '../../gameData/levellist.js';

class LevelMenu extends React.Component {
  renderLevelsArr() {
    let levelList = levels.slice(1);
    let levelLinks = levelList.map((el, i) => {
      let levelIndex = i + 1;
      return <Link to={"/game/" + levelIndex} key={levelIndex} className="text ready" >{levelIndex}&nbsp; {el.name}</Link>;
    }, '');
    return levelLinks;
  }
  render() {
    let levelsArr = this.renderLevelsArr();
    return <div id="level-menu">
      {levelsArr}
    </div>
  }
}

export default LevelMenu;
