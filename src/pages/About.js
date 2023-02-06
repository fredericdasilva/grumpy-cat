import React from "react";

export const About = () => {
  return (
    <div className="flex-center-column h-md text-center">
      <h4>
        This application is using{" "}
        <a href="https://beta.openai.com/docs/introduction">OpenAI API</a> and
        allow to play with predicted completion and image generation.
      </h4>
    </div>
  );
};
