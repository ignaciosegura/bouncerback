//Level list

import React from 'react';
import { Link } from 'react-router-dom';
import levels from '../../gameData/levellist.js';

import GameShop from '../stores/gameshop.js';

class LevelMenu extends React.Component {
  constructor() {
    super();
    GameShop.resetScore();
  }

  renderLevelsArr() {
    let levelList = levels.slice(1);
    let levelLinks = levelList.map((el, i) => {
      let levelIndex = i + 1;
      return <Link to="/game" key={levelIndex} level={levelIndex} className="text ready" onClick={this.onClickLevelButton}>{levelIndex}&nbsp; {el.name}</Link>;
    }, '');
    return levelLinks;
  }

  onClickLevelButton(e) {
    GameShop.level = parseInt(e.target.attributes.level.value);
  }

  render() {
    let levelsArr = this.renderLevelsArr();
    return <div id="level-menu">
      {levelsArr}
    </div>
  }
}

export default LevelMenu;
