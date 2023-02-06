import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Card } from "../components/Card/Card";
import { Speech } from "../components/Speech/Speech";
import { ToggleSwitch } from "../components/ToggleSwitch/ToggleSwitch";
import { enableAutoTTS } from "../utility/MediaHelper";

export const Home = () => {
  const [completionModechecked, setCompletionModeChecked] = useState(true);

  useEffect(() => {
    console.log("imageModechecked !!" + completionModechecked);
  }, [completionModechecked]);

  useEffect(() => {
    enableAutoTTS();
  });

  return (
    <div className="flex-center-column gap-sm test">
      <h1 className="title"> Grumpy Cat</h1>

      <p className="text"></p>

      <Card>
        <ToggleSwitch
          id="switch"
          checked={completionModechecked}
          onChange={(imageModechecked) =>
            setCompletionModeChecked(imageModechecked)
          }
          optionLabels={["Mode Chat", "Mode Image"]}
        />
        <h4 style={{ color: "var(--color-gray-700)" }}>Welcome</h4>
        <p className="color-gray-500 my-md font-default">
          My name is Grumpy cat, I know a lot of stuff thanks to OpenAI api
          (Chat GPT). Let's discuss !
        </p>
      </Card>

      <Card>
        <Speech completionModechecked={completionModechecked} key="speech" />
      </Card>

      <Footer />
    </div>
  );
};
