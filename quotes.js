const quotes = [
  "Just look for me somewhere beyond the limits of human endurance.",
  "When I was told I had to pull my weight around here, I did not realize that included everyone else's",
  "Play by the rules, and get beat by those who don't.",
  "Failure is simply an opportunity to begin again, next time some place else, where they like to hire losers.",
  "Negativity: what optimists call objectivity when they don't like the message.",
  "None of us is as dumb as all of us.",
  "Believe in yourself (becuase the rest of us think your an idiot).",
  "Consistency is only a virtue of your not a screwup.",
  "Your attitude determines your altitude about as much as that platitude inspires my gratitude.",
  "The secret to success is knowing who to blame for your failures.",
  "When the winds of change blow hard enough, the most trivial of things can turn into deadly projectiles.",
  "Collaboration: it's not much use pooling your resources if your chief resource is stupidity.",
  "Even the most ambitious little pebble will never grow up to be a big rock.",
  "Do it later: the early worm is for the birds.",
  "Diversity: becuase everybody deserves an equal chance to prove their incompetence.",
  "The only constant in all of your dissatisfying relationships is you.",
  "If you keep asking others to give you the benefit of the doubt, eventually they will just doubt your benefit.",
  "A friend is just a stranger you have not alienated yet.",
  "Mistakes: it could be that the purpose of your life is only to serve as a warning to others.",
  "Until you spread your wings, you'll have no idea how far you have to walk.",
  "Get to work! You are not being paid to believe in the power of your dreams.",
  "Multitasking: the art of doing twice as much as you should half as well as you could.",
  "Procrastination: Hard work often pays off after time, but laziness pays off now.",
  "Those who say it cannot be done should not interrupt those busy proving them right.",
  "Perseverance: the courage to ignore the obvious wisdom of turning back.",
  "Distinction: looking sharp is easy when you have not done any work (think pencils).",
  "Teams: together we can do the work of one!",
  "Inside every snowflake is a perfectly unique meltdown just waiting to happen.",
  "Failure is not an option. It's your destiny.",
  "The sky is the limit. Too bad you cant fly.",
  "Responsibility: water is not the only thing that roles down hill.",
  "Hype: the power to get  excited about which you know isn't real.",
  "Survival: one life's journy is another's destination"
];

//Show random quote
function new_quote() {
  const quote = '"' + quotes[Math.floor(Math.random() * (quotes.length - 1))] + '"';
  document.getElementById('quotes').innerHTML = quote;
}
new_quote();
document.getElementById('quotes').addEventListener('click', new_quote);
