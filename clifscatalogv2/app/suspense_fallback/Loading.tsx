import '../globalStyles.css';

export const Loading = () => {

    //adding a little jokey joke during the loading screen so that the user might get a laugh while our data loads

    const foodJokes = [
      ["Why did the tomato turn red?", "Because it saw the salad dressing!"],
      ["What do you call cheese that isn't yours?", "Nacho cheese!"],
      ["Why did the scarecrow become a successful gardener?", "Because he was outstanding in his field!"],
      ["What do you get when you cross a snowman and a dog?", "Frostbite!"],
      ["How do you organize a space party?", "You 'planet'!"],
      ["Why did the cookie go to the doctor?", "Because it was feeling crumby!"],
      ["What do you call a fake noodle?", "An impasta!"],
      ["Why was the math book sad?", "Because it had too many problems!"],
      ["Why don't scientists trust atoms?", "Because they make up everything!"],
      ["What do you call a bear with no teeth?", "A gummy bear!"],
      ["Why did the bicycle fall over?", "Because it was two-tired!"],
      ["Did you hear about the claustrophobic astronaut?", "He just needed a little space!"],
      ["What did one wall say to the other wall?", "I'll meet you at the corner!"],
      ["Why did the golfer bring two pairs of pants?", "In case he got a hole in one!"],
      ["How do you organize a space party?", "You 'planet'!"],
      ["Why did the fish blush?", "Because it saw the ocean's bottom!"],
      ["What did the janitor say when he jumped out of the closet?", "Supplies!"],
      ["Why was the computer cold?", "It left its Windows open!"],
      ["How does a snowman get around?", "By riding an 'icicle'!"],
      ["Why did the scarecrow win an award?", "Because he was outstanding in his field!"],
      ["What do you get when you cross a vampire with a snowman?", "Frostbite!"],
      ["Why don't scientists trust atoms?", "Because they make up everything!"],
      ["What do you call a bear with no teeth?", "A gummy bear!"],
      ["Why did the math book look sad?", "Because it had too many problems!"],
      ["What do you call a sleeping bull?", "A bulldozer!"],
      ["What do you call a cow with no legs?", "Ground beef!"]
    ];

    //grabs the random joke from the above array, and returns an object of the question + answer for easy accessibility
      function getRandomJoke(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return {
          question: array[randomIndex][0],
          answer: array[randomIndex][1]
        };
      }

      //stores the random joke into a variable
      const randomJoke = getRandomJoke(foodJokes);

    return (
    <div className='randomJoke'>
        <div className="loading-spinner"></div>
        <h4 className='jokeQuestion'>{randomJoke.question}</h4>
        <h4 className='jokeAnswer'>{randomJoke.answer}</h4>
    </div>
)}