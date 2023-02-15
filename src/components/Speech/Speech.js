import React, { useState } from "react";
import { Cat } from "./../Cat/Cat";
import { ChatBuble } from "./ChatBuble";

export const Speech = ({ completionModechecked }) => {
  const [mute, setMute] = useState(false);
  const [onError, setOnError] = useState(false);
  // const [mode, setMode] = useState("completion");
  const [previousConversation, setPreviousConversation] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [nbQuestions, setQuestions] = useState(1);

  return (
    <>
      <div key="div_speach_main">
        {Array.from(new Array(nbQuestions)).map((_, i) => (
          <div key={"div_speach_chat_".concat(i)}>
            <ChatBuble
              key={i}
              mode={completionModechecked ? "completion" : "image"}
              mute={mute}
              previousConversation={previousConversation}
              onAnswerProvided={(conversation) => {
                setQuestions(nbQuestions + 1);
                setPreviousConversation(conversation);
              }}
              onImageProvided={() => setQuestions(nbQuestions + 1)}
              onSpeak={(b) => setSpeaking(b)}
              setOnError={setOnError}
            />
          </div>
        ))}
      </div>

      <button
        data-toggle="tooltip"
        title={mute ? "Off" : "On"}
        className="btnSpeaker"
      >
        {mute ? (
          <i className="icon-volume-down" onClick={() => setMute(!mute)} />
        ) : (
          <i className="icon-volume-up" onClick={() => setMute(!mute)} />
        )}
      </button>

      <Cat speaking={speaking} onError={onError} />
    </>
  );
};
