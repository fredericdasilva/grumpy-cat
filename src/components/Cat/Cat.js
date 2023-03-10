import React from "react";
import "../../style/scss/cat.scss";
import grumpyCat from "../../assets/img/grumpy-cat.png";
import grumpyCatSpeaking from "../../assets/img/grumpy-cat-speaking-2.png";
import grumpyCatSleeping from "../../assets/img/grumpy-cat-sleep.png";

export const Cat = (props) => {
  return (
    <>
      {props.onError ? (
        <img
          src={grumpyCatSleeping}
          alt="GrumpyCatSleeping"
          className="grumpyImg"
        />
      ) : (
        <div className="cat">
          {props.speaking ? (
            <>
              <img
                src={grumpyCatSpeaking}
                alt="GrumpyCatSpeaking"
                className="grumpyImg"
              />
              <div className="cat__mouth">
                <div className="cat__top"></div>
                <div className="cat__bottom"></div>
              </div>
            </>
          ) : (
            <img src={grumpyCat} alt="GrumpyCat" className="grumpyImg" />
          )}
        </div>
      )}
    </>
  );
};
