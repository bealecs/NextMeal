"use client";
import { useContext } from "react";
import "../globalStyles.css";
import { ThemeContext } from "../store/ThemeProvider";

export const Loading = () => {
  const theme = useContext(ThemeContext);

  //adding a little jokey joke during the loading screen so that the user might get a laugh while our data loads

  const foodJokes = [
    ["Why did the vegetable go to the art gallery?", "To find its inner peas!"],
    ["What's a vampire's favorite fruit?", "A blood orange!"],
    ["Why did the lettuce win the race?", "Because it was ahead in the salad!"],
    ["How do you fix a broken tomato?", "With tomato paste!"],
    ["What did the sushi say to the bee?", "Wasabi!"],
    ["Why don't oysters donate to charity?", "Because they're shellfish!"],
    ["What do you call a group of musical whales?", "An orca-stra!"],
    ["Why did the banana go to the doctor?", "Because it wasn't peeling well!"],
    ["What do you call cheese that can't hear?", "Provolone!"],
    ["Why did the baker go to therapy?", "Because he kneaded it!"],
    ["What's a snowman's favorite breakfast?", "Frosted flakes!"],
    ["Why did the computer go to the restaurant?", "To have its bytes!"],
    ["What do you get when you cross a snowman and a dog?", "Frostbite!"],
    ["Why did the coffee file a police report?", "It got mugged!"],
    [
      "Why did the kitchen utensils go to the gym?",
      "To get a little more whisked!",
    ],
    ["How do you make a lemon drop?", "Just let it fall!"],
    ["What do you call a bear with no teeth?", "A gummy bear!"],
    [
      "Why did the grape stop in the middle of the road?",
      "Because it ran out of juice!",
    ],
    ["What do you call a stolen yam?", "A hot potato!"],
    ["Why did the tomato turn red?", "Because it saw the salad dressing!"],
    [
      "What's a skeleton's least favorite room?",
      "The living room during dinner!",
    ],
    ["Why did the cookie go to the doctor?", "Because it was feeling crumby!"],
    ["What do you call a fake noodle?", "An impasta!"],
    ["Why did the math book look sad?", "Because it had too many problems!"],
    ["How do you organize a space party?", "You 'planet'!"],
    ["Why did the fish blush?", "Because it saw the ocean's bottom!"],
  ];

  //grabs the random joke from the above array, and returns an object of the question + answer for easy accessibility
  function getRandomJoke(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return {
      question: array[randomIndex][0],
      answer: array[randomIndex][1],
    };
  }

  //stores the random joke into a variable
  const randomJoke = getRandomJoke(foodJokes);

  return (
    <div className={theme.themeValue + "_randomJoke"}>
      <div className="loading-spinner"></div>
      <h4 className="jokeQuestion">{randomJoke.question}</h4>
      <h4 className="jokeAnswer">{randomJoke.answer}</h4>
    </div>
  );
};
