import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames('day-list__item',{
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  let spotsStr = "spot";

  if (props.spots !== 1) {
    spotsStr = "spots";
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots > 0 ? `${props.spots} ${spotsStr}` : `no spots`} remaining</h3>
    </li>
  );
}