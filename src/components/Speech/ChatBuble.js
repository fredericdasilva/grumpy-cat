import axios from "axios";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useSpeechSynthesis } from "react-speech-kit";
import { displayCurrentTime } from "../../utility/DateHelper";
import "./../../style/css/ChatBuble.css";
import { capitalizeFirstLetter } from "../../utility/StringHelper";
import { isMicrophoneAllowed, isMobile } from "../../utility/MediaHelper";
import { LazyImage } from "../Image/LazyImage";
import { Spinner } from "../Spinner/Spinner";

export const ChatBuble = (props) => {
  const [question, setQuestion] = useState("");
  const [questionDate, setQuestionDate] = useState("");
  const [responseDate, setResponseDate] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [imageResponse, setImageResponse] = useState("");
  const [displaySpinner, setDisplaySpinner] = useState(false);
  const [chatResponseReceived, setChatResponseReceived] = useState(false);
  const [isMicroReady, setIsMicroReady] = useState(false);
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const onEnd = () => {
    props.onSpeak(false);
  };
  const onError = (event) => {
    console.warn(event);
  };
  const { speak, speaking, cancel, supported } = useSpeechSynthesis({
    onEnd,
    onError,
  });

  useEffect(() => {
    if (props.mute === true && speaking) {
      cancel();
    }
    // eslint-disable-next-line
  }, [props.mute]);

  useEffect(() => {
    //Disable Microphone for tablet and smartphone
    setIsMicroReady(isMicrophoneAllowed() && !isMobile());
  }, []);

  const callOpenai = async (prompt) => {
    setDisplaySpinner(true);
    setQuestionDate(displayCurrentTime());

    console.log("V4");

    prompt = props.previousConversation + "\n" + prompt;
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/openai/" + props.mode, {
        prompt,
      })
      .then(async function (response) {
        console.log(response);
        props.setOnError(false);

        setDisplaySpinner(false);

        if (props.mode === "completion") {
          let answer =
            response.data.answer ??
            response.data.reponse ??
            response.data.response ??
            response.data ??
            response.prompt ??
            response.output ??
            response.réponse;

          setChatResponse(answer);

          if (props.mute === false && supported) {
            speak({ text: answer });
            props.onSpeak(true);
          }
          props.onAnswerProvided(answer);
        } else if (props.mode === "image") {
          setImageResponse(response.data);
          props.onImageProvided();
        }

        setChatResponseReceived(true);
        setResponseDate(displayCurrentTime());
      })
      .catch(function (error) {
        setDisplaySpinner(false);
        props.setOnError(true);
        console.error(error);
      });
  };

  useEffect(() => {
    //Once listening is over and transcript is ready, call Openai api
    if (transcript && !listening && !chatResponseReceived) {
      setQuestion(transcript);
      callOpenai(transcript);
    }
    // eslint-disable-next-line
  }, [listening, chatResponseReceived, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      {/* QUESTION */}
      <div className="container-left">
        {questionDate.length === 0 && (
          <div id="wrapper">
            <span id="QuestionToAsk">
              <textarea
                className="question"
                onKeyDown={(e) => {
                  if (e.code === "Enter" || e.code === "NumpadEnter") {
                    callOpenai(question);
                  }
                }}
                disabled={responseDate.length > 0}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                name="question"
                autoFocus={true}
                placeholder="Your question here ..."
              />
              <div className="micro_and_send">
                {/* Micro icon */}
                <div className="microphone">
                  {{ browserSupportsSpeechRecognition } &&
                    isMicroReady &&
                    (!listening ? (
                      <button
                        data-toggle="tooltip"
                        title="Speak to your microphone"
                      >
                        <i
                          className="icon-microphone"
                          onClick={() => {
                            console.log("SpeechRecognition.startListening");
                            SpeechRecognition.startListening({
                              continuous: false,
                              language: "fr-FR",
                            });
                          }}
                        />
                      </button>
                    ) : (
                      <button
                        data-toggle="tooltip"
                        title="Recording"
                        className="microphone-recording"
                      >
                        <i
                          className="icon-microphone"
                          onClick={() => {
                            SpeechRecognition.stopListening();
                          }}
                        />
                      </button>
                    ))}
                </div>

                {/* Send button  */}
                <button
                  data-toggle="tooltip"
                  title="Send question"
                  className="btnSend"
                >
                  <i
                    className="icon-circle-arrow-right"
                    onClick={() => {
                      (() => {
                        callOpenai(question);
                      })();
                    }}
                  />
                </button>
              </div>
            </span>
          </div>
        )}
        {questionDate.length > 0 && (
          <span className="questionAsked">
            <label>{capitalizeFirstLetter(question)}</label>
            <span className="time-left">{questionDate}</span>
          </span>
        )}
      </div>
      {/* ANSWER */}
      <Spinner visible={displaySpinner} />

      <div className="container-right">
        {chatResponse && <label className="response">{chatResponse}</label>}
        {imageResponse && <LazyImage src={imageResponse} />}
        <span className="time-right">{responseDate}</span>
      </div>
    </>
  );
};
